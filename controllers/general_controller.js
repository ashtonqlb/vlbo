const form_data = require("form-data");
const Mailgun = require("mailgun.js");
const { user_model } = require("../models/user_model");
const mailgun = new Mailgun(form_data);
const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });
const bcrypt = require("bcryptjs");


function validate_new_user (req, res) {
    let errors = [];

    if (!validate_name(req.body.name)) {
        errors.push("Invalid name!");
    }

    if (!validate_email(req.body.email)) {
        errors.push("Invalid email!");
    }

    if (!validate_password(req.body.password)) {
        errors.push("Invalid password!");
    }

    if (errors.length > 0) {
        res.render("sign-up", { errors: errors });
    } else {
        user_model.create({ name: req.body.name, email: req.body.email, password: req.body.password });
        welcome(req, res);
    }
}

function validate_login (req, res) {
    user_model.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result) {
                            req.session.user = user;

                            if (user.clerk_mode === 'on') {
                                req.session.clerk_mode = true;
                            } else {
                                req.session.clerk_mode = false;
                            }

                            welcome(req, res);
                        } else {
                            res.render("log-in", { error: "Invalid username or password." });
                        }
                    });
            } else {
                res.render("log-in", { error: "Invalid username or password." });
            }
        })
        .catch(err => {
            console.log(err);
            res.render("log-in", { error: "An error occurred." });
        });
}

function validate_password(password) {
    const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-=\\]).{8,12}$/;
    return password_regex.test(password);
};

function validate_email(email) {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
};

function validate_name(name) {
    return name !== null;
}

// Render functions, moved out of the server.

function sign_up(req, res) {
    res.render("sign-up");
}

function log_in(req, res) {
    res.render("log-in");
}

function create_new_user(req, res) {
    validate_new_user(req, res);
}

function log_out(req, res) {
    req.session.destroy();
    if (err) {
        console.log(err)
    } else {
        res.redirect("/");
    }
}

function welcome(req, res) {
    mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: ("SATELLITEHARASSMENT <mailgun@" + process.env.MAILGUN_DOMAIN + ">"),
        to: process.env.MAILGUN_RECIPIENT,
        subject: "Welcome to Vlbo!",
        text: `Ashton Lunken. Vlbo. ${req.body.name}. Repeat. Ashton Lunken. Vlbo. ${req.body.name}. Cells. Interlinked. Cells. Into. Links.`
    })
    .then(err => console.log(err)); // logs any error

    res.render("welcome", { name: req.body.name });
    res.redirect("/");
}

module.exports = {
    sign_up,
    log_in,
    log_out,
    welcome,
    validate_login,
    create_new_user
};
