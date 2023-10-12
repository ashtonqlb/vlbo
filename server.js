/*************************************************************************************
* WEB322 - 2237 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Ashton Bennet
* Student ID    : 134128214
* Course/Section: WEB322 NEE
*
**************************************************************************************/
const path = require("path");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const rental_db = require("./models/rentals-db.js")

const app = express();

app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout',  __dirname + '/views/layout/main.ejs');

app.use(express.static(path.join(__dirname, 'assets')));

rentals = [
    {
        headline: "Cozy Downtown Apartment",
        numSleeps: 2,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 100,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "../assets/images/property1.webp",
        featured: true,
    },
    {
        headline: "Spacious Family Home",
        numSleeps: 6,
        numBedrooms: 3,
        numBathrooms: 2,
        pricePerNight: 200,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "../assets/images/property2.jpg",
        featured: false,
    },
    {
        headline: "Luxury Penthouse Suite",
        numSleeps: 4,
        numBedrooms: 2,
        numBathrooms: 2,
        pricePerNight: 300,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "../assets/images/property3.png",
        featured: false,
    },
    {
        headline: "Quaint Cottage by the Lake",
        numSleeps: 3,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 120,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "../assets/images/property1.webp",
        featured: false,
    },
    {
        headline: "Modern Downtown Loft",
        numSleeps: 2,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 150,
        city: "Vancouver",
        province: "British Columbia",
        imageUrl: "../assets/images/property2.jpg",
        featured: true,
    },
    {
        headline: "Charming Cottage in the Woods",
        numSleeps: 4,
        numBedrooms: 2,
        numBathrooms: 1,
        pricePerNight: 180,
        city: "Vancouver",
        province: "British Columbia",
        imageUrl: "../assets/images/property3.png",
        featured: false,
    },
];

const feat = rental_db.getFeaturedRentals();

app.get('/', function routeHandler(req, res) {
    res.render("home", {
        rentals: feat,
    });
});

app.get('/rentals', function routeHandler(req, res) { 
    res.render('rentals');
});

app.get('/signup', function routeHandler(req, res) { 
    res.render('sign-up');
});

app.get('/login', function routeHandler(req, res) {
    res.render('log-in');
});

// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);