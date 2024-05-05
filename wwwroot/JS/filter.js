document.getElementById('sortBy').addEventListener('change', function () {
    sortCards(this.value);
});

function sortCards(sortBy, cards) {
    let direction = sortBy.split('-')[1]; // 'asc' or 'desc'
    let prop = sortBy.split('-')[0]; // 'type', 'hp', etc.

    cards.sort((a, b) => {
        let valA = a[prop];
        let valB = b[prop];

        // Handle numeric and string comparisons
        if (!isNaN(valA) && !isNaN(valB)) { // if both values are numbers
            valA = parseInt(valA);
            valB = parseInt(valB);
        }

        if (valA < valB) {
            return direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

    // Re-render the sorted cards
    displayCards();
}

function displayCards() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear the current results

    cardsData.forEach(card => {
        const cardElement = createCardElement(card);
        resultsContainer.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `
        <img src="${card.images.large}" alt="Image of ${card.name}">
        <div class="card-info">
            <h3>${card.name}</h3>
            <p><strong>Type:</strong> ${card.type}</p>
            <p><strong>Subtype:</strong> ${card.subtype}</p>
            <p><strong>HP:</strong> ${card.hp}</p>
            <p><strong>Level:</strong> ${card.level}</p>
            <p><strong>Set:</strong> ${card.set}</p>
            <!-- Additional fields can be added here -->
        </div>
    `;
    return cardDiv;
}
