const form_data = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(form_data);
const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });

// Validation logic, moved from loose JS files.

function create_new_user (req, res) {
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
        res.render("welcome", { name: req.body.name });
    }
}

function validate_login (req, res) {
    if (req.body.email && req.body.password) {
        if (validate_email(req.body.email)) {
            res.render("welcome", { name: req.body.name });
        }
    }
    else {
        res.render("log-in", { error: "Invalid username or password." });
    }
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

function test_new_user(req, res) {
    create_new_user(req, res);
}

function test_login(req, res) {
    validate_login(req, res);
}

function welcome(req, res) {
    mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: ("SATELLITEHARASSMENT <mailgun@" + process.env.MAILGUN_DOMAIN + ">"),
        to: process.env.MAILGUN_RECIPIENT,
        subject: "Welcome to Vlbo!",
        text: `Ashton Lunken. Vlbo. ${req.body.name}. Repeat. Ashton Lunken. Vlbo. ${req.body.name}. Cells. Interlinked. Cells. Into. Links.`
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
    res.render("welcome", { name: req.body.name });
    res.redirect("/");
}

module.exports = {
    sign_up,
    log_in,
    welcome,
    test_login,
    test_new_user
};
