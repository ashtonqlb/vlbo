const mongoose = require('mongoose');
const { rentals_model } = require('../models/rentals_model');

default_data_set = [
    {
        headline: "Cozy Downtown Apartment",
        numSleeps: 2,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 100,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "/images/property1.webp",
        featured: true,
    },
    {
        headline: "Spacious Family Home",
        numSleeps: 6,
        numBedrooms: 3,
        numBathrooms: 2,
        pricePerNight: 200,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "/images/property2.jpg",
        featured: false,
    },
    {
        headline: "Luxury Penthouse Suite",
        numSleeps: 4,
        numBedrooms: 2,
        numBathrooms: 2,
        pricePerNight: 300,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "/images/property3.png",
        featured: false,
    },
    {
        headline: "Quaint Cottage by the Lake",
        numSleeps: 3,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 120,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "/images/property1.webp",
        featured: false,
    },
    {
        headline: "Modern Downtown Loft",
        numSleeps: 2,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 150,
        city: "Vancouver",
        province: "British Columbia",
        imageUrl: "/images/property2.jpg",
        featured: true,
    },
    {
        headline: "Charming Cottage in the Woods",
        numSleeps: 4,
        numBedrooms: 2,
        numBathrooms: 1,
        pricePerNight: 180,
        city: "Vancouver",
        province: "British Columbia",
        imageUrl: "/images/property3.png",
        featured: false,
    },
];

function load_default_set(req, res) {
    if (!req.session.user.clerk_mode) {
        res.status(401).render('layout', { 
          title: '401 Unauthorized', 
          body: '<h1>401 Unauthorized</h1><p>You are not authorized to add rentals</p>'
        });
      } else {
        rentals_model.countDocuments()
            .then(count => {
                if (count === 0) {
                    rentals_model.insertMany(default_data_set)
                        .then(() => {
                            res.send("Data loaded successfully!")
                        })
                        .catch(err => {
                            res.send("Data load failed: " + err)
                        });
                } else {
                    rentals_model.deleteMany()
                        .then(() => {
                            return rentals_model.insertMany(default_data_set);
                        })
                        .then(() => {
                            res.redirect('/rentals');
                        })
                        .catch(err => {
                            res.send("Data load failed: " + err)
                        });
                }
            })
            .catch(err => {
                res.send("Document counting failed: " + err );
            })
    }
}

module.exports = {
    load_default_set
}