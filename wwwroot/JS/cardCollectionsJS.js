window.onload = function () {
    const cardCollectionKey = 'cardCollection';
    const cardCollectionContainer = document.getElementById('cardCollectionContainer');
    let cardCollection = localStorage.getItem(cardCollectionKey);
    cardCollection = cardCollection ? JSON.parse(cardCollection) : [];

    if (cardCollection.length > 0) {
        cardCollection.forEach(card => {
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
                <div class="card-detail">
                    <img src="${card.images.large}" alt="Image of ${card.name}">
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
                </div>
            `;
            cardCollectionContainer.appendChild(cardElement);
        });
    } else {
        cardCollectionContainer.innerHTML = '<p>No cards in your collection.</p>';
    }
};
function toggleDetails(detailsElement) {
    const display = detailsElement.style.display;
    detailsElement.style.display = display === 'none' ? 'block' : 'none';
}


