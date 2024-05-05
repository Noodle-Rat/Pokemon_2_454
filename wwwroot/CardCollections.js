// Collections.js
document.addEventListener('DOMContentLoaded', function () {
    // Check if we are on the collections page and need to fetch collection data
    if (document.getElementById('results')) {
        fetchCollection();
    }
});

// Function to add a card to the collection
function addToCollection(cardId) {
    fetch('/api/collections/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken, // Assuming user authentication
        },
        body: JSON.stringify({ cardId: cardId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to the collections page upon successful addition
                window.location.href = '/collections.html'; // Adjust the URL as necessary
            } else {
                alert('Failed to add card to collection.');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to fetch and display the collection
function fetchCollection() {
    fetch('/api/collections/view', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + userToken, // Replace 'userToken' with the actual token
        }
    })
        .then(response => response.json())
        .then(data => {
            displayCollection(data.cards);
        })
        .catch(error => console.error('Error:', error));
}

// Function to display the collection on the collections page
function displayCollection(cards) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <h4>${card.name}</h4>
            <img src="${card.images.small}" alt="Image of ${card.name}">
            <p><strong>Type:</strong> ${card.types.join(', ')}</p>
        `; // Ensure that card structure corresponds to the data model
        resultsContainer.appendChild(cardElement);
    });
}
