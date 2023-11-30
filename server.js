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
const dotenv = require("dotenv").config();
const session = require("express-session");

const app = express();

const general_controller = require("./controllers/general_controller.js");
const load_data_controller = require("./controllers/load_data_controller.js");
const rentals_controller = require("./controllers/rentals_controller.js");

app.use(express_layouts);
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/views/layout/main.ejs");

app.use(express.static(path.join(__dirname, "assets")));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.get("/", rentals_controller.home);

app.get("/rentals", rentals_controller.rentals);
app.get("/rentals/list", rentals_controller.rentals_editor);

app.get("/load-data/rentals", load_data_controller.load_default_set);

app.get("/rentals/add", rentals_controller.render_create_rental);

app.get('/rentals/edit/:_id', function(req, res) {
    let id = req.params._id;
    rentals_controller.render_update_rental(req, res);
});

app.get("/rentals/remove/:_id", function(req, res) {
    let id = req.params._id;
    rentals_controller.render_delete_rental(req, res);
});

app.post("/rentals/add", rentals_controller.logic_create_rental);
app.post('/rentals/edit/:_id', function(req, res) {
    let id = req.params._id;
    rentals_controller.logic_update_rental(req, res);
});

app.post("/rentals/remove/:_id", function(req, res) {
    let id = req.params._id;
    rentals_controller.logic_delete_rental(req, res);
});

app.get("/cart", rentals_controller.cart);

app.get("/signup", general_controller.sign_up);
app.post("/signup", general_controller.create_new_user);

app.get("/login", general_controller.log_in);
app.post('/login', general_controller.validate_login);

app.get("/logout", general_controller.log_out);

app.post('/welcome', general_controller.welcome);


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