const rentals = [
    {
      id: 1,
      name: "Cozy Cabin",
      image: "/images/cabin.jpg",
      price: 100,
      description: "A cozy cabin in the woods"
    },
    {
      id: 2,
      name: "Luxury Villa",
      image: "/images/villa.jpg",
      price: 500,
      description: "A luxurious villa with a private pool"
    },
    {
      id: 3,
      name: "Beach House",
      image: "/images/beach-house.jpg",
      price: 250,
      description: "A beautiful beach house with ocean views"
    }
  ];
  
  // Generate the rental cards dynamically
  const rentalCards = rentals.map(rental => `
    <div class="rental-card">
      <img src="${rental.image}" alt="${rental.name}">
      <h3>${rental.name}</h3>
      <p>${rental.description}</p>
      <p>Price: $${rental.price}/night</p>
      <a href="/rentals/${rental.id}">Book Now</a>
    </div>
  `).join('');
  
  // Pass the rental cards to the EJS file
  res.render('index', { rentalCards });