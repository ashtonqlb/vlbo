const express = require("express");
const router = express.Router();

const rental_db = require("../models/rentals-db.js")

router.get("/", (req, res) => {
    const all_rentals_grouped = rental_db.getRentalsByCityAndProvince;

    res.render("rentals/list", {
        rentals: all_rentals_grouped,
        title: "Rentals Page"
    });
})

router.get("/featured", (req, res) => {
    const featured_rentals = rental_db.getFeaturedRentals;

    res.render("rentals/list", {
        rentals: featured_rentals,
        title: "Rentals Page"
    });
})

module.exports = router;