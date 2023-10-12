rentals = [
    {
        headline: "Cozy Downtown Apartment",
        numSleeps: 2,
        numBedrooms: 1,
        numBathrooms: 1,
        pricePerNight: 100,
        city: "Toronto",
        province: "Ontario",
        imageUrl: "",
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
        imageUrl: "",
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
        imageUrl: "",
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
        imageUrl: "",
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
        imageUrl: "",
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
        imageUrl: "",
        featured: false,
    },
];

function getFeaturedRentals() {
    return rentals.filter(rental => rental.featured);
}

function getRentalsByCityAndProvince() {
    return rentals.reduce((acc, rental) => {
        const key = `${rental.city}, ${rental.province}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(rental);
        return acc;
    }, {});
}

module.exports = {getFeaturedRentals, getRentalsByCityAndProvince};