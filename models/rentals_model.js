const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log('Connected successfully to server'))
.catch(err => console.error('Could not connect to MongoDB', err));;

const property_schema = new mongoose.Schema({
    headline: {
        type: String,
        require: true
    },
    numSleeps: {
        type: Number,
        require: true
    },
    numBedrooms: {
        type: Number,
        require: true
    },
    numBathrooms: {
        type: Number,
        require: true
    },
    pricePerNight: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        require: true
    }
});

function get_featured_rentals() {
    return rentals_model.find({ featured: true });
}

function get_rentals_by_city_and_province() {
    return rentals_model.find().sort({city: 1, province: 1});
}

function get_rentals_by_headline() {
    return rentals_model.find().sort({headline: 1});
}

const rentals_model = mongoose.model("rentals", property_schema);

module.exports = {
    rentals_model,
    get_featured_rentals, 
    get_rentals_by_city_and_province,
    get_rentals_by_headline
};