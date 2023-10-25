function validate_login (req, res) {
    return validate_email(req.body.email) && req.body.password !== null;
}

function validate_email(email) {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
};