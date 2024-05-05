const API_BASE_URL = 'https://api.pokemontcg.io/v2/cards';
const API_KEY = 'bc2a8f03-c772-4ffa-b663-d1648c41abc0';

function getSelectedOptions(containerId) {
    const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`);
    if (!checkboxes.length) return ""; // Return empty string if no checkboxes are checked
    const values = Array.from(checkboxes).map(checkbox => checkbox.value);
    return values.map(value => encodeURIComponent(value)).join(' OR ');
}

// Fetch card data with filters
function performSearch() {
    const queryInput = document.getElementById('searchQuery').value.trim();
    let queryParts = [];
    if (queryInput) queryParts.push(`name:${encodeURIComponent(queryInput)}*`);

    // Fetch selections from checkboxes using the updated getSelectedOptions function
    const type = getSelectedOptions('typeFilter');
    const subtype = getSelectedOptions('subtypeFilter');
    const supertype = getSelectedOptions('supertypeFilter');
    const rarity = getSelectedOptions('rarityFilter');

    // Construct the query only if there are selected values
    if (type) queryParts.push(`(types:${type})`);
    if (subtype) queryParts.push(`(subtypes:${subtype})`);
    if (supertype) queryParts.push(`(supertype:${supertype})`);
    if (rarity) queryParts.push(`(rarity:${rarity})`);

    const finalQuery = queryParts.join(' AND ');
    let apiUrl = `${API_BASE_URL}?q=${finalQuery}`;

    fetch(apiUrl, { headers: { 'X-Api-Key': API_KEY } })
        .then(handleResponse)
        .then(data => displayResults(data.data, 'results'))
        .catch(handleError);
}

// Handle fetch responses
function handleResponse(response) {
    if (!response.ok) throw new Error('Failed to fetch data from API');
    return response.json(); // Parses the JSON response body
}

// Display results in the specified container
function displayResults(cards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';  // Clear previous results

    if (cards && cards.length > 0) {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';  // Add a class for styling

            const types = card.types ? card.types.join(', ') : 'N/A';
            const attacks = card.attacks ? card.attacks.map(attack => `${attack.name} (${attack.damage})`).join(', ') : 'No Attacks';
            const weaknesses = card.weaknesses ? card.weaknesses.map(weakness => `${weakness.type} ${weakness.value}`).join(', ') : 'No Weaknesses';

            cardElement.innerHTML = `
                <h4>${card.name}</h4>
                <img src="${card.images.small}" alt="Image of ${card.name}">
                <p><strong>Supertype:</strong> ${card.supertype || 'N/A'}</p>
                <p><strong>Subtypes:</strong> ${card.subtypes ? card.subtypes.join(', ') : 'N/A'}</p>
                <p><strong>HP:</strong> ${card.hp || 'N/A'}</p>
                <p><strong>Types:</strong> ${types}</p>
                <p><strong>Attacks:</strong> ${attacks}</p>
                <p><strong>Weaknesses:</strong> ${weaknesses}</p>
                <button id="details-${card.id}">View Details</button>
            `;
            container.appendChild(cardElement);

            // Add click event listener for the View Details button
            document.getElementById(`details-${card.id}`).addEventListener('click', function () {
                const cardDetails = encodeURIComponent(JSON.stringify(card));
                window.open(`cardDetails.html?card=${cardDetails}`, '_blank');
            });
        });
    } else {
        container.innerHTML = '<p>No cards found.</p>';
    }
}

function handleError(error) { // Generic error handler
    console.error('Error:', error);
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `<p>${error.message}</p>`;
}
function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener('click', function (event) {
    var closestDropdown = event.target.closest('.custom-dropdown');
    if (!closestDropdown) {
        var dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function (dropdown) {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    }
}, true);

// Update the selected display text
document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        updateSelectedItems(this);
    });
});

function updateSelectedItems(checkbox) {
    var container = checkbox.closest('.custom-dropdown');
    var selectedDisplay = container.querySelector('.dropdown-selected');
    var selectedItems = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(function (item) {
        return item.value;
    });

    selectedDisplay.textContent = selectedItems.join(', ') || 'Select Type';
}


const types = ["Colorless", "Darkness", "Dragon", "Fairy", "Fighting", "Fire", "Grass", "Lightning", "Metal", "Psychic", "Water"];
const subtypes = ["BREAK", "Baby", "Basic", "EX", "GX", "Goldenrod Game Corner", "Item", "LEGEND", "Level-Up", "MEGA", "Pokémon Tool", "Pokémon Tool F", "Rapid Strike", "Restored", "Rocket's Secret Machine", "Single Strike", "Special", "Stadium", "Stage 1", "Stage 2", "Supporter", "TAG TEAM", "Technical Machine", "V", "VMAX"];
const rarities = ["Amazing Rare", "Common", "LEGEND", "Promo", "Rare", "Rare ACE", "Rare BREAK", "Rare Holo", "Rare Holo EX", "Rare Holo GX", "Rare Holo LV.X", "Rare Holo Star", "Rare Holo V", "Rare Holo VMAX", "Rare Prime", "Rare Prism Star", "Rare Rainbow", "Rare Secret", "Rare Shining", "Rare Shiny", "Rare Shiny GX", "Rare Ultra", "Uncommon"];
const supertypes = ["Energy", "Pokémon", "Trainer"];

function createDropdown(options, containerId, label) {
    const container = document.getElementById(containerId);
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'custom-dropdown';
    dropdownDiv.onclick = () => toggleDropdown(`${containerId}Dropdown`);

    const selectedDiv = document.createElement('div');
    selectedDiv.className = 'dropdown-selected';
    selectedDiv.id = `${containerId}DropdownSelected`;
    selectedDiv.textContent = `Select ${label}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'dropdown-content';
    contentDiv.id = `${containerId}Dropdown`;

    options.forEach(option => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `${containerId}[]`;
        checkbox.value = option;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${option}`));
        contentDiv.appendChild(label);
    });

    dropdownDiv.appendChild(selectedDiv);
    dropdownDiv.appendChild(contentDiv);
    container.appendChild(dropdownDiv);
}

document.addEventListener('DOMContentLoaded', function () {
    createDropdown(types, 'typeFilter', 'Type');
    createDropdown(subtypes, 'subtypeFilter', 'Subtype');
    createDropdown(rarities, 'rarityFilter', 'Rarity');
    createDropdown(supertypes, 'supertypeFilter', 'Supertype');
});

