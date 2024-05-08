window.onload = function () {
    const cardCollectionKey = 'cardCollection';
    const cardCollectionContainer = document.getElementById('cardCollectionContainer');
    let cardCollection = JSON.parse(localStorage.getItem(cardCollectionKey) || '[]');

    loadDecks(); // Loads the decks when the page loads

    if (cardCollection.length > 0) {
        cardCollection.forEach(card => {
            const cardElement = createCardElement(card);
            cardCollectionContainer.appendChild(cardElement);
        });
    } else {
        cardCollectionContainer.innerHTML = '<p>No cards in your collection.</p>';
    }
};

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-detail';
    let abilitiesHTML = card.abilities ? card.abilities.map(ability => `<li>${ability.name} (${ability.type}): ${ability.text}</li>`).join('') : 'None';
    let attacksHTML = card.attacks ? card.attacks.map(attack => `<li>${attack.name} - Damage: ${attack.damage}, Cost: ${attack.cost?.join(', ')} (${attack.convertedEnergyCost})</li>`).join('') : 'None';
    let weaknessesHTML = card.weaknesses ? card.weaknesses.map(weak => `<li>${weak.type}: ${weak.value}</li>`).join('') : 'None';
    let resistancesHTML = card.resistances ? card.resistances.map(res => `<li>${res.type}: ${res.value}</li>`).join('') : 'None';

    cardElement.innerHTML = `
        <div class="card-image">
            <img src="${card.images.large}" alt="Image of ${card.name}">
        </div>
        <div class="card-info">
            <h3>${card.name}</h3>
            <p><strong>ID:</strong> ${card.id}</p>
            <p><strong>Supertype:</strong> ${card.supertype}</p>
            <p><strong>Subtypes:</strong> ${card.subtypes?.join(', ') || 'N/A'}</p>
            <p><strong>Level:</strong> ${card.level}</p>
            <p><strong>HP:</strong> ${card.hp}</p>
            <p><strong>Types:</strong> ${card.types?.join(', ') || 'N/A'}</p>
            <p><strong>Evolves From:</strong> ${card.evolvesFrom}</p>
            <p><strong>Evolves To:</strong> ${card.evolvesTo?.join(', ') || 'N/A'}</p>
            <p><strong>Abilities:</strong><ul>${abilitiesHTML}</ul></p>
            <p><strong>Attacks:</strong><ul>${attacksHTML}</ul></p>
            <p><strong>Weaknesses:</strong><ul>${weaknessesHTML}</ul></p>
            <p><strong>Resistances:</strong><ul>${resistancesHTML}</ul></p>
            <p><strong>Retreat Cost:</strong> ${card.retreatCost?.join(', ') || 'N/A'} (${card.convertedRetreatCost})</p>
            <p><strong>Set:</strong> ${card.set.name} (${card.set.series})</p>
            <p><strong>Number:</strong> ${card.number}</p>
            <p><strong>Artist:</strong> ${card.artist}</p>
            <p><strong>Rarity:</strong> ${card.rarity}</p>
            <p><strong>Flavor Text:</strong> ${card.flavorText}</p>
            <p><strong>Legalities:</strong> Standard: ${card.legalities.standard || 'N/A'}, Expanded: ${card.legalities.expanded || 'N/A'}, Unlimited: ${card.legalities.unlimited || 'N/A'}</p>
            <p><strong>Regulation Mark:</strong> ${card.regulationMark}</p>
        </div>
    `;
    // Container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const addToDeckButton = document.createElement('button');
    addToDeckButton.textContent = 'Add to Deck';
    addToDeckButton.className = 'left-button';
    addToDeckButton.onclick = function () { addToDeck(card.id); };

    const removeFromCollectionButton = document.createElement('button');
    removeFromCollectionButton.textContent = 'Remove';
    removeFromCollectionButton.className = 'right-button';
    removeFromCollectionButton.onclick = function () { removeFromCollection(card.id); };

    // Append buttons to their container
    buttonContainer.appendChild(addToDeckButton);
    buttonContainer.appendChild(removeFromCollectionButton);

    // Append the button container to the card element
    cardElement.appendChild(buttonContainer);

    return cardElement;
}

function removeFromCollection(cardId) {
    const cardCollectionKey = 'cardCollection';
    let cardCollection = JSON.parse(localStorage.getItem(cardCollectionKey) || '[]');
    const newCardCollection = cardCollection.filter(card => card.id !== cardId);
    localStorage.setItem(cardCollectionKey, JSON.stringify(newCardCollection));

    // Refresh the page or handle UI update
    location.reload(); // This reloads the page to reflect changes. Alternatively, you can update the UI without reloading.
}


function loadDecks() {
    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    const decksContainer = document.getElementById('decksContainer');
    decksContainer.innerHTML = ''; // Clear any existing content
    decks.forEach(deck => {
        const deckLink = document.createElement('a');
        deckLink.href = `deckDetails.html?deck=${encodeURIComponent(deck.name)}`;
        deckLink.className = 'deck-link';
        deckLink.textContent = deck.name; // Display deck name
        decksContainer.appendChild(deckLink);
    });
}
function createNewDeck() {
    const deckName = prompt('Enter new deck name:');
    if (!deckName) return; // Exit if no input

    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    if (!decks.some(d => d.name === deckName)) {
        decks.push({ name: deckName, cards: [] });
        localStorage.setItem('decks', JSON.stringify(decks));
        loadDecks(); // Refresh the deck list
    } else {
        alert('A deck with this name already exists!');
    }
}

function addToDeck(cardId) {
    const deckName = prompt('Enter the deck name to add this card to:');
    if (!deckName) return; // Exit if no input

    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    const deck = decks.find(d => d.name === deckName);
    if (deck) {
        if (!deck.cards.includes(cardId)) {
            deck.cards.push(cardId);
            localStorage.setItem('decks', JSON.stringify(decks));
            alert('Card added to deck!');
        } else {
            alert('Card already in this deck!');
        }
    } else {
        alert('Deck not found!');
    }
}


