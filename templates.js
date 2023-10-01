function loadPokemonTemplate(singlePokemonJson, i) {
    let {name, img, bg} = infosAboutPokemon(singlePokemonJson);

    return `
  <div json-index="${i}" class="pokemon-box ${bg}" onclick="showDetails(${i})" id="index${i}">
      <div class="pokemon-infos">
          <h1 id="pokemon-name" class="pokemon-name">${name}</h1>
          <ul class="characteristic" id="characteristic${i}">
              ${returnPokemontypes(singlePokemonJson)}
          </ul>
      </div>
      <div class="img-box">
          <img id="pokemon-img${i}" src="${img}" alt="pokemon-img">
      </div>
  
  </div>
  `;
}

function renderAboutTemplate(i) {
    let detailPokemon = pokemonData[i];
    let pokemonHeight = detailPokemon['height'] / 10; // Divide by 10 to move the decimal point to the left
    let pokemonWeight = detailPokemon['weight'] / 10; // Divide by 10 to move the decimal point to the left

    // Use map to extract the names of the abilities
    let pokemonAbilities = detailPokemon['abilities'].map(ability => ability['ability']['name']);

    // Create an HTML template with the ability names
    let template = '<div class="pokemon-abilities"><div>Height</div>' +
        '<div>Weight</div>' +
        '<div>Abilities</div></div>' +
        '<div class="pokemon-abilities">' +
        `<div>${pokemonHeight.toFixed(1)} m</div>` +  // Use toFixed(1) to display a decimal place
        `<div>${pokemonWeight.toFixed(1)} kg</div><div class="flex">`;

    for (let ability of pokemonAbilities) {
        template += `<div>${ability} &nbsp</div>`;
    }
    template += '</div></div>';

    // return assignment;
    return template;
}

function renderStatsTemplate(i) {
    let detailPokemon = pokemonData[i];
    // Use map to extract the names of the stats
    let statNames = detailPokemon['stats'].map(stat => stat['stat']['name']);

    // Create an HTML template with the stat names
    let template = '<div class="pokemon-stats">';
    for (let statName of statNames) {
        template += `<div>${statName}</div>`;
    }
    template += '</div>';

    return template;
}

function renderBaseStatsTemplate(i) {
    let detailPokemon = pokemonData[i];
    // Use map to extract the names of the baseStats
    let baseStatNames = detailPokemon['stats'].map(base_stat => base_stat['base_stat']);

    // Create an HTML template with the base stat names
    let template = '<div class="pokemon-base_stats">';
    for (let baseStatName of baseStatNames) {
        template += `<div>${baseStatName}</div>`;
    }
    template += '</div>';

    return template;
}

function renderEvolutionTemplate(i) {
    let detailPokemon = pokemonData[i];
    let detailPokemon2 = pokemonData[i + 1];
    let detailPokemon3 = pokemonData[i + 2];
    let evolutionPokemon = detailPokemon['sprites']['other']['official-artwork']['front_default'];
    let evolutionPokemon2 = detailPokemon2['sprites']['other']['official-artwork']['front_default'];
    let evolutionPokemon3 = detailPokemon3['sprites']['other']['official-artwork']['front_default'];

    let template = `<div class="evolution-pokemons">
                                <img src="${evolutionPokemon}">
                                <img src="${evolutionPokemon2}">
                                <img src="${evolutionPokemon3}">
                            </div>`;

    return template;
}

function renderMovesTemplate(i) {
    let detailPokemon = pokemonData[i];
    // Use map to extract the names of the moves
    let moveNames = detailPokemon['moves'].map(move => move['move']['name']);

    // Limit number of moves to 35
    moveNames = moveNames.slice(0, 35);

    // Create an HTML template with the Move names
    let template = '<div class="pokemon-moves">';
    for (let index = 0; index < moveNames.length; index++) {
        template += `<div>${moveNames[index]}`;
        if (index < moveNames.length - 1) {
            template += ',&nbsp; ';
        }
        template += `</div>`;
    }
    template += '</div>';

    return template;
}
