const rentalProperties = [
    {
        image: '/property1.webp',
        name: 'Apartment',
        sleeps: 8,
        bedrooms: 1,
        bathrooms: 0,
        price: 700,
    },
    {
        image: '/property2.jpg',
        name: 'A House',
        sleeps: 10,
        bedrooms: 3,
        bathrooms: 2.5,
        price: 200,
    },
    {
        image: '/property3.png',
        name: 'The entire city of Toronto I guess',
        sleeps: 250000000,
        bedrooms: 125000000,
        bathrooms: 125000000,
        price: 99999999999,
    },
];

// Function to create a property card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';

    const image = document.createElement('img');
    image.src = property.image;
    image.alt = property.name;
    card.appendChild(image);

    const info = document.createElement('div');
    info.className = 'property-info';

    const h2 = document.createElement('h2');
    h2.textContent = property.name;
    info.appendChild(h2);

    const sleeps = document.createElement('p');
    sleeps.textContent = `Sleeps: ${property.sleeps}`;
    info.appendChild(sleeps);

    const bedrooms = document.createElement('p');
    bedrooms.textContent = `Bedrooms: ${property.bedrooms}`;
    info.appendChild(bedrooms);

    const bathrooms = document.createElement('p');
    bathrooms.textContent = `Bathrooms: ${property.bathrooms}`;
    info.appendChild(bathrooms);

    const price = document.createElement('p');
    price.textContent = `Price per Night: $${property.price}`;
    info.appendChild(price);

    card.appendChild(info);
    
    return card;
}

// Function to render the property cards
function renderPropertyCards(properties) {
    const propertyContainer = document.getElementById('property-container');

    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const card = createPropertyCard(property);
        propertyContainer.appendChild(card);

        // Add a line break after every 3 cards to limit to 3 cards per row
        if ((i + 1) % 3 === 0) {
            propertyContainer.appendChild(document.createElement('br'));
        }
    }
}

renderPropertyCards(rentalProperties);