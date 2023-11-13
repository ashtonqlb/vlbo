rentals = [
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

function get_featured_rentals() {
    return rentals.filter(rental => rental.featured);
}

function get_rentals_by_city_and_province() {
    return rentals.reduce((acc, rental) => {
        const key = `${rental.city}, ${rental.province}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(rental);
        return acc;
    }, {});
}

module.exports = {get_featured_rentals, get_rentals_by_city_and_province};