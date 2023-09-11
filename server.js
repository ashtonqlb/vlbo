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
const app = express();

app.get('/', function routeHandler(req, res) { //Homepage
    app.use('/styles', express.static(path.join(__dirname, 'styles'))); // fetch static stylesheets
    app.use('/scripts', express.static(path.join(__dirname, 'scripts'))); //fetch static scripts
    res.sendFile(__dirname + '/pages/index.html');
});

app.get('/rentals', function routeHandler(req, res) { //All listings
    res.send('rentals');
});

app.get('/signup', function routeHandler(req, res) { //signup page
    res.send(__dirname + '/pages/index.html#signup');
});

app.get('/login', function routeHandler(req, res) { //login page
    res.send(__dirname + '/pages/index.html#login');
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