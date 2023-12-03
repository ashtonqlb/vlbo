// rentals_controller.js

const db = require("../models/rentals_model.js");

function home(req, res) {
  db.get_featured_rentals()
  .then(rentals => {
          if (!rentals) {
              res.render('home', { error: 'No data' });
          } else {
              const rentalsObjects = rentals.map(rental => rental.toObject());
              res.render('home', { featured_rentals: rentalsObjects });
          }
      })
      .catch(err => {
          console.error(err);
          res.render('home', { error: 'An error occurred' });
      });
}

function rentals(req, res) {
  db.get_rentals_by_city_and_province()
  .then(rentals => {
      if (!rentals) {
          res.render('rentals', { error: 'No data' });
      } else {
          const rentalsObjects = rentals.map(rental => rental.toObject());
          res.render('rentals', { all_rentals: rentalsObjects });
      }
  })
  .catch(err => {
      console.error(err);
      res.render('rentals', { error: 'An error occurred' });
  });
}

function rentals_editor(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.find()
      .then(rentals => {
        res.render("editor", { rentals: rentals });
      })
      .catch(err => {
        res.status(500).send("Error retrieving rentals: " + err);
      });
  } else {
    res.redirect("/login");
  }
}

function render_create_rental(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    res.render("add", {name: req.session.user.name});
  } else {
    res.redirect("/login");
  }
}

function render_update_rental(req, res) { 
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.findOne({ _id: req.params._id })
      .then(rental => {
        res.render("edit", { rental: rental });
      })
      .catch(err => {
        res.status(500).send("Error retrieving rental: " + err);
      });
  } else {
    res.redirect("/login");
  }
}

function render_delete_rental(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.findOne({ _id: req.params._id })
      .then(rental => {
        res.render("remove", { name: req.session.user.name });
      })
      .catch(err => {
        res.status(500).send("Error retrieving rental: " + err);
      });
  } else {
    res.redirect("/login");
  }
}

function render_update_rental(req, res) { 
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.findOne({ _id: req.params._id })
      .then(rental => {
        res.render("remove", { name: req.session.user.name, rental: rental });
      })
      .catch(err => {
        res.status(500).send("Error retrieving rental: " + err);
      });
  } else {
    res.redirect("/login");
  }
}


function logic_create_rental(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    req.body.featured = req.body.featured === 'on';

    const new_rental = new db.rentals_model(req.body);
    new_rental.save();
    res.redirect("/rentals/list");
  } else {
    res.redirect("/login");
  }
}

function logic_update_rental(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.findOneAndUpdate(
      { _id: req.params._id },
      {
        numSleeps: req.body.numSleeps,
        numBedrooms: req.body.numBedrooms,
        numBathrooms: req.body.numBathrooms,
        pricePerNight: req.body.pricePerNight,
        city: req.body.city,
        province: req.body.province,
        imageUrl: req.body.imageUrl,
        featured: req.body.featured
      },
      { new: true }
    )
    .then(doc => {
      res.redirect("/rentals/list");
    })
    .catch(err => {
      console.log("Something wrong when updating data!", err);
    });
  } else {
    res.redirect("/login");
  }
}

function logic_delete_rental(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.findOneAndDelete({ _id: req.params._id })
      .then(doc => {
        console.log(doc);
        res.redirect("/rentals/list");
      })
      .catch(err => {
        console.log("Something wrong when deleting data!", err);
        res.status(500).send("Internal Server Error");
      });
  } else {
    res.redirect("/login");
  }
}

function cart(req, res) {
  if (req.session.user && !req.session.user.clerk_mode) {
    res.render("cart", {name: req.session.user.name, cart: req.session.cart });
  } else {
    res.redirect("/login");
  }
}

function add_to_cart(req, res) {
  let id = req.params._id;

  db.rentals_model.findById(id, function(err, rental) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else if (!rental) {
      res.status(404).send("Not Found");
    } else {
      req.session.cart.push(rental);
      res.redirect("/cart");
    }
  });
}

function delete_from_cart(req, res) {
  let rentalId = req.body.rentalId;
  let index = req.session.cart.findIndex(rental => rental._id.toString() === rentalId);
  if (index !== -1) {
    req.session.cart.splice(index, 1);
  }

  res.redirect("/cart");
}

module.exports = {
  home,
  rentals,
  delete_from_cart,
  add_to_cart,
  cart,

  rentals_editor,
  render_create_rental,
  render_update_rental,
  render_delete_rental,

  logic_create_rental,
  logic_update_rental,
  logic_delete_rental
};