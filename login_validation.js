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

function validate_email(email) {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
};

module.exports = {
    validate_login
};