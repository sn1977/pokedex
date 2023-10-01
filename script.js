let pokemonData = [];
let url = `https://pokeapi.co/api/v2/pokemon/`;
let currentPokemonIndex = -1; // Initialize the variable to store the selected index
let isDetailContainerOpen = false; // Variable to track the status of the details container

async function loadPokemon() {
    pokemonData = [];
    document.getElementById('mainSite').innerHTML = '';

    for (let i = 1; i <= 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let resp = await fetch(url);
        let currentPokemon = await resp.json();
        pokemonData.push(currentPokemon);
    }
    console.log(pokemonData);
    renderPokemons();
}

function renderPokemons() {
    let pokemonHTML = document.getElementById('mainSite');

    for (let i = 0; i < pokemonData.length; i++) {
        let singlePokemonJson = pokemonData[i];
        pokemonHTML.innerHTML += loadPokemonTemplate(singlePokemonJson, i);
    }
}

function infosAboutPokemon(singlePokemonJson) {
    let name = singlePokemonJson['name'];
    let img = singlePokemonJson['sprites']['other']['dream_world']['front_default'];
    let bg = singlePokemonJson['types'][0]['type']['name'];

    // Convert the first letter of the name to capital letters
    name = name.charAt(0).toUpperCase() + name.slice(1);

    return {name, img, bg};
}

function returnPokemontypes(singlePokemonJson) {
    let types = [];

    for (let i = 0; i < singlePokemonJson['types'].length; i++) {
        types.push(`<li>${singlePokemonJson['types'][i]['type']['name']}</li>`);
    }
    return types.join('');
}

// JavaScript to monitor and hide the .pokemon-box elements when scrolling
window.addEventListener('scroll', function () { // The 'scroll' event is triggered when the user scrolls on the page.
    let header = document.querySelector('header');
    let headerHeight = header.offsetHeight;
    // We select the header element and find its height (offsetHeight).
    let pokemonBoxes = document.querySelectorAll('.pokemon-box'); // We select all elements with class 'pokemon-box'.

    // Check each .pokemon-box item
    pokemonBoxes.forEach(function (box) { // For each '.pokemon-box' element we perform the following steps:
        let boxTop = box.getBoundingClientRect().top; // We determine the distance of the '.pokemon-box' element to the top edge of the visible area of the browser window (viewport).

        // When the top edge of the .pokemon-box reaches or exceeds the header
        if (boxTop <= headerHeight) {
            box.classList.add('hide-pokemon'); // Add the CSS class to hide the element
        } else {
            box.classList.remove('hide-pokemon'); // Remove the CSS class to make the element visible
        }
    });
});

function showDetails(i) {
    if (!isDetailContainerOpen) {
        currentPokemonIndex = i; // Save the selected index globally

        let detailPokemon = pokemonData[i];
        let pokemonName = detailPokemon['name'];
        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        let pokemonId = pokemonData[i]['id'].toString().padStart(3, '0');
        let bg = detailPokemon['types'][0]['type']['name'];

        // Get the type names correctly here and convert them into <span> containers
        let typeNames = detailPokemon['types'].map(type => `<span class="pokemon-bg">${type['type']['name']}</span>`);
        let pokemonBg = typeNames.join('');

        // Pass the relevant values as parameters to insertDetailsPokemon    
        insertDetailsPokemon(i, bg, pokemonName, pokemonId, pokemonBg);

        getInfo('about');

        // Set the status of the details container to open
        isDetailContainerOpen = true;
    }
}

function insertDetailsPokemon(i, bg, pokemonName, pokemonId, pokemonBg) {
    document.getElementById('pokedex').classList.add(bg);
    document.getElementById('pokemonName').innerHTML = pokemonName;
    document.getElementById('pokemonImage').src = pokemonData[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonId').innerHTML = `#${pokemonId}`;
    document.getElementById('pokemonBg').innerHTML = pokemonBg;
    document.getElementById('detailContainer').classList.remove('d-none');
}

function closeDetails() {
    let bg = pokemonData[currentPokemonIndex]['types'][0]['type']['name'];
    document.getElementById('detailContainer').classList.add('d-none');
    document.getElementById('pokedex').classList.remove(bg);

    // Set the details container status to closed
    isDetailContainerOpen = false;

    document.getElementById('pokemon-search').value = '';
    restorePlaceholder();
}

function getInfo(tab) {
    document.getElementById('pokemonInfo').innerHTML = '';
    if (tab === 'stats') {
        if (currentPokemonIndex !== -1) {
            document.getElementById('pokemonInfo').innerHTML = renderStatsTemplate(currentPokemonIndex);
            document.getElementById('pokemonInfo').innerHTML += renderBaseStatsTemplate(currentPokemonIndex);
            renderStatsChart(currentPokemonIndex); // Hier wird das Chart eingefügt
        }
    }

    if (tab === 'about') {
        if (currentPokemonIndex !== -1) {
            document.getElementById('pokemonInfo').innerHTML = renderAboutTemplate(currentPokemonIndex);
        }
    }

    if (tab === 'evolution') {
        if (currentPokemonIndex !== -1) {
            document.getElementById('pokemonInfo').innerHTML = renderEvolutionTemplate(currentPokemonIndex);
        }
    }

    if (tab === 'moves') {
        if (currentPokemonIndex !== -1) {
            document.getElementById('pokemonInfo').innerHTML = renderMovesTemplate(currentPokemonIndex);
        }
    }
}

async function loadMorePokemon() {
    let pokemonHTML = document.getElementById('mainSite');
    pokemonHTML.innerHTML = ''; // Initialisieren Sie eine leere Zeichenkette

    for (let i = 22; i <= 100; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let resp = await fetch(url);
        let currentPokemon = await resp.json();
        pokemonData.push(currentPokemon);
    }
    renderPokemons();
}

// JavaScript for the search function
function searchPokemon() {
    let pokemonSearch = document.getElementById('pokemon-search').value.toLowerCase(); // Convert search term to lowercase

    // Search the list of Pokemon data for the matching Pokemon
    for (let i = 0; i < pokemonData.length; i++) {
        let pokemonName = pokemonData[i]['name'].toLowerCase();

        // When a suitable Pokemon has been found
        if (pokemonName === pokemonSearch) {
            showDetails(i);
            return; // End the loop as the Pokemon has been found
        }
    }

    alert('Pokemon not found');
    document.getElementById('pokemon-search').value = '';
    restorePlaceholder();
}

// JavaScript for the input field
function clearPlaceholder() {
    let inputElement = document.getElementById('pokemon-search');
    inputElement.setAttribute('placeholder', '');
}

function restorePlaceholder() {
    let inputElement = document.getElementById('pokemon-search');
    if (inputElement.value === '') {
        inputElement.setAttribute('placeholder', 'Pokemon Name');
    }
}