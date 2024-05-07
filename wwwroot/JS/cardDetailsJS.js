// Assuming you have a secure way to store and retrieve the userToken
const userToken = 'admin';
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const card = JSON.parse(decodeURIComponent(params.get('card')));

    const detailsContainer = document.getElementById('cardDetails');
    const attacks = card.attacks ? card.attacks.map(attack => `${attack.name} - Damage: ${attack.damage}, Cost: ${attack.cost.join(', ')}, Converted Cost: ${attack.convertedEnergyCost}`).join('<br>') : 'No Attacks';
    const weaknesses = card.weaknesses ? card.weaknesses.map(weakness => `${weakness.type} - Value: ${weakness.value}`).join('<br>') : 'No Weaknesses';
    const resistances = card.resistances ? card.resistances.map(resistance => `${resistance.type} - Value: ${resistance.value}`).join('<br>') : 'No Resistances';
    const abilities = card.abilities ? card.abilities.map(ability => `${ability.name} - Type: ${ability.type}, Text: ${ability.text}`).join('<br>') : 'No Abilities';
    const retreatCost = card.retreatCost ? card.retreatCost.join(', ') : 'N/A';

    detailsContainer.innerHTML = `
    <img src="${card.images.large}" alt="Image of ${card.name}">
    <p class="attribute"><strong>ID:</strong> ${card.id}</p>
    <h1>${card.name}</h1>
    <p class="attribute"><strong>Supertype:</strong> ${card.supertype || 'N/A'}</p>
    <p class="attribute"><strong>Subtypes:</strong> ${card.subtypes ? card.subtypes.join(', ') : 'N/A'}</p>
    <p class="attribute"><strong>Level:</strong> ${card.level || 'N/A'}</p>
    <p class="attribute"><strong>HP:</strong> ${card.hp || 'N/A'}</p>
    <p class="attribute"><strong>Types:</strong> ${card.types ? card.types.join(', ') : 'N/A'}</p>
    <p class="attribute"><strong>Evolves From:</strong> ${card.evolvesFrom || 'N/A'}</p>
    <p class="attribute"><strong>Evolves To:</strong> ${card.evolvesTo ? card.evolvesTo.join(', ') : 'N/A'}</p>
    <p class="attribute"><strong>Attacks:</strong> <br>${attacks}</p>
    <p class="attribute"><strong>Weaknesses:</strong> <br>${weaknesses}</p>
    <p class="attribute"><strong>Resistances:</strong> <br>${resistances}</p>
    <p class="attribute"><strong>Abilities:</strong> <br>${abilities}</p>
    <p class="attribute"><strong>Retreat Cost:</strong> ${retreatCost} (Converted Cost: ${card.convertedRetreatCost})</p>
    <p class="attribute"><strong>Set:</strong> ${card.set.name}</p>
    <p class="attribute"><strong>Number:</strong> ${card.number}</p>
    <p class="attribute"><strong>Artist:</strong> ${card.artist}</p>
    <p class="attribute"><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
    <p class="attribute"><strong>Flavor Text:</strong> ${card.flavorText || 'N/A'}</p>
    <p class="attribute"><strong>Legalities:</strong> Standard: ${card.legalities.standard || 'N/A'}, Expanded: ${card.legalities.expanded || 'N/A'}, Unlimited: ${card.legalities.unlimited || 'N/A'}</p>
    <p class="attribute"><strong>Regulation Mark:</strong> ${card.regulationMark || 'N/A'}</p>
`;

/*    console.log("Card ID:", card.id); // Should log the card ID

    document.getElementById('addToCollectionBtn').onclick = function () {
        addToCollection(card); // Pass the card to a function
    };
};

function addToCollection(card) {
    let userId = 1; // This should ideally be set dynamically based on logged-in user information

    // The payload that will be sent to the server
    const payload = {
        UserId: userId,
        CardId: card.id
    };

    console.log("Payload being sent:", JSON.stringify(payload));


    fetch('/api/userCards/addCardToUserCollection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json().then(data => {
            if (!response.ok) {
                // Log or display more detailed error information from the server
                console.error('Error:', data);
                throw new Error(data.message || `Server responded with status: ${response.status}`);
            }
            return data;
        }))
        .then(data => {
            console.log("Server Response:", data);
            alert(data.message || "Card added successfully!");
            window.location.href = 'cardCollections.html';
        })
        .catch(error => {
            console.error('Fetch operation error:', error);
            alert(error.message || 'Could not add card to collection. Please try again.');
        });

}
*/
    document.getElementById('addToCollectionBtn').onclick = function () {
        const cardCollectionKey = 'cardCollection'; // Key for localStorage
        let cardCollection = localStorage.getItem(cardCollectionKey);
        cardCollection = cardCollection ? JSON.parse(cardCollection) : [];

        // Check if the card is already in the collection
        if (!cardCollection.some(existingCard => existingCard.id === card.id)) {
            cardCollection.push(card); // Add the card to the collection
            localStorage.setItem(cardCollectionKey, JSON.stringify(cardCollection)); // Save back to localStorage
            alert('Card added to your collection!');
        } else {
            alert('This card is already in your collection.');
        }

        // Redirect to collections page
        window.location.href = 'cardCollections.html';
    };

};



