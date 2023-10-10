import {rentals} from '../../models/rentals-db.js'


// Generate the rental cards dynamically
const rentalCards = rentals.map(rental => `
  <div class="property-card">
    <img src="${rental.image}" alt="${rental.name}">
    <h3>${rental.name}</h3>
    <p>${rental.description}</p>
    <p>Price: $${rental.price}/night</p>
    <a href="/rentals/${rental.id}">Book Now</a>
  </div>
`).join('');

// Pass the rental cards to the EJS file
res.render('../../views/partials/rental.ejs', { rentals });