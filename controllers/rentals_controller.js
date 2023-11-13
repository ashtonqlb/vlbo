// rentals_controller.js

const db = require("../models/rentals_model.js");

function get_featured_rentals(req, res) {
  res.render("home", { featured_rentals: db.get_featured_rentals(), user: req.session.user});
}

function get_rentals_by_city_and_province(req, res) {
  res.render("rentals", { all_rentals: db.get_rentals_by_city_and_province(), user: req.session.user });
}

function rentals_editor(req, res) { //list
  if (req.session.user && req.session.clerk_mode) {
    res.render("rentals-editor", { all_rentals: db.get_all_rentals(), user: req.session.user});
  } else {
    res.redirect("/login");
  }
}

function cart(req, res) {
  if (req.session.user) {
    res.render("cart", { user: req.session.user});
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  get_featured_rentals,
  get_rentals_by_city_and_province,
  rentals_editor,
  cart,
};