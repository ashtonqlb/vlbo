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
const express_layouts = require("express-ejs-layouts");

const app = express();

const rentals_controller = require("./controllers/rentals_controller.js");
const sign_up_controller = require("./controllers/sign_up_controller.js");
const log_in_controller = require("./controllers/log_in_controller.js");

app.use(express_layouts);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/views/layout/main.ejs");

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", rentals_controller.get_featured_rentals);

app.get("/rentals", rentals_controller.get_rentals_by_city_and_province);

app.get("/signup", function routeHandler(req, res) {
  res.render("sign-up");
});

app.get("/login", function routeHandler(req, res) {
  res.render("log-in");
});

app.get("/welcome", function routeHandler(req, res) {
    res.render("welcome");
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