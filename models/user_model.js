const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log('Connected successfully to server'))
.catch(err => console.error('Could not connect to MongoDB', err));;

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    }
});

user_schema.pre("save", function(next) {
    let user = this;

    bcrypt.genSalt()
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((encrypted_password) => {
                    user.password = encrypted_password; 
                    next();
                })
            .catch(err => {
                console.log(`Error occurred when hashing ... ${err}`);
            });
        });
});

const user_model = mongoose.model("users", user_schema);

module.exports = {
    user_model
}