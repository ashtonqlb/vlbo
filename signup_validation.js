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

module.exports = {
    create_new_user
};