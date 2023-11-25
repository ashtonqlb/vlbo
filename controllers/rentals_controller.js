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

function rentals_editor(req, res) { //list
  if (req.session.user && req.session.user.clerk_mode) {
    res.render("editor", {name: req.session.user.name, editor_action: 'partials/default'});
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
    db.get_rentals_by_headline()
      .then(rentals => {
        const rentalsObject = rentals.reduce((obj, rental) => {
          obj[rental._id] = rental;
          return obj;
        }, {});
        res.render("edit", {name: req.session.user.name, rental: rentalsObject});
      })
      .catch(err => {
        res.status(500).send("Error retrieving rentals: " + err);
      });
  } else {
    res.redirect("/login");
  }
}

function render_delete_rental(req, res) { 
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.find()
      .then(rentals => {
        res.render("remove", { rentals: rentals });
      })
      .catch(err => {
        res.status(500).send("Error retrieving rentals: " + err);
      });
  } else {
    res.redirect("/login");
  }
};

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
      { headline: req.body.headline },
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
      { new: true },
      function(err, doc) {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        console.log(doc);
      }
    );
    res.redirect("/rentals/list");
  } else {
    res.redirect("/login");
  }
}



function logic_delete_rental(req, res) {
  if (req.session.user && req.session.user.clerk_mode) {
    db.rentals_model.findOneAndDelete({ _id: req.body._id }, function(
      err,
      doc
    ) {
      if (err) {
        console.log("Something wrong when deleting data!");
      }
      console.log(doc);
    });
    res.redirect("/rentals/list");
  } else {
    res.redirect("/login");
  }
} 

function cart(req, res) {
  if (req.session.user && !req.session.user.clerk_mode) {
    res.render("cart", {name: req.session.user.name});
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  home,
  rentals,
  cart,

  rentals_editor,
  render_create_rental,
  render_update_rental,
  render_delete_rental,

  logic_create_rental,
  logic_update_rental,
  logic_delete_rental
};