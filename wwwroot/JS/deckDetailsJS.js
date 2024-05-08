window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const deckName = urlParams.get('deck'); // Get deck name from URL parameters
    const deckNameHeader = document.getElementById('deckNameHeader');
    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    const cardCollection = JSON.parse(localStorage.getItem('cardCollection') || '[]');

    if (deckName) {
        deckNameHeader.textContent = `${deckName} Deck Cards`; // Update header text
    }

    const selectedDeck = decks.find(deck => deck.name === deckName);
    const deckCardsContainer = document.getElementById('deckCardsContainer');

    if (selectedDeck && selectedDeck.cards.length > 0) {
        selectedDeck.cards.forEach(cardId => {
            const card = cardCollection.find(c => c.id === cardId);
            if (card) {
                const cardElement = createCardElement(card);
                deckCardsContainer.appendChild(cardElement);
            }
        });
    } else {
        deckCardsContainer.innerHTML = `<p>No cards in the '${deckName}' deck.</p>`;
    }
};

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-detail';

    let abilitiesHTML = card.abilities ? card.abilities.map(ability => `
        <li>${ability.name} (${ability.type}): ${ability.text}</li>
    `).join('') : 'None';

    let attacksHTML = card.attacks ? card.attacks.map(attack => `
        <li>${attack.name} - Damage: ${attack.damage}, Cost: ${attack.cost?.join(', ')} (${attack.convertedEnergyCost})</li>
    `).join('') : 'None';

    let weaknessesHTML = card.weaknesses ? card.weaknesses.map(weak => `
        <li>${weak.type}: ${weak.value}</li>
    `).join('') : 'None';

    let resistancesHTML = card.resistances ? card.resistances.map(res => `
        <li>${res.type}: ${res.value}</li>
    `).join('') : 'None';

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

    // Create Remove from Deck button
    const removeFromDeckButton = document.createElement('button');
    removeFromDeckButton.textContent = 'Remove from Deck';
    removeFromDeckButton.onclick = function () { removeFromDeck(card.id); };
    cardElement.appendChild(removeFromDeckButton);

    return cardElement;
}

function removeFromDeck(cardId) {
    const urlParams = new URLSearchParams(window.location.search);
    const deckName = urlParams.get('deck');
    const decks = JSON.parse(localStorage.getItem('decks') || '[]');
    const deck = decks.find(d => d.name === deckName);
    if (deck) {
        const index = deck.cards.indexOf(cardId);
        if (index > -1) {
            deck.cards.splice(index, 1); // Remove the card from the deck
            localStorage.setItem('decks', JSON.stringify(decks));
            alert('Card removed from deck!');
            location.reload(); // Reload the page to update the UI
        } else {
            alert('Card not found in this deck!');
        }
    } else {
        alert('Deck not found!');
    }
}
