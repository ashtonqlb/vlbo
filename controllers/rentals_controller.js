// rentals_controller.js

const db = require("../models/rentals_model.js");

function get_featured_rentals(req, res) {
  res.render("home", { featured_rentals: db.get_featured_rentals()});
}

function get_rentals_by_city_and_province(req, res) {
  res.render("rentals", { all_rentals: db.get_rentals_by_city_and_province() });
}

function rentals_editor(req, res) { //list
  res.render("welcome", { name: "Clerkmode: " + req.body.name });
}

function cart(req, res) {
  res.render("welcome", { name: "Not Clerkmode: " + req.body.name });
}

module.exports = {
  get_featured_rentals,
  get_rentals_by_city_and_province,
  rentals_editor,
  cart,
};