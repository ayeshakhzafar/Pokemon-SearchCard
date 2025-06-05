function fetchPokemon() {
    var pokeName = document.getElementById('pokeName').value.toLowerCase();
    var errorMsg = document.getElementById('errorMsg');
    var pokeCard = document.getElementById('pokeCard');

    errorMsg.innerHTML = '';
    pokeCard.style.display = 'none';

    errorMsg.innerHTML = 'Loading...';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokeName}`, true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var pokemonData = JSON.parse(xhr.responseText);

                document.getElementById('pokeImage').src = pokemonData.sprites.front_default;
                document.getElementById('pokeNameDisplay').innerHTML = pokemonData.name;

                const pokeType = pokemonData.types.map(type => type.type.name).join(', ');
                document.getElementById('pokeType').innerHTML = pokeType;
                const typeColor = getTypeColor(pokemonData.types[0].type.name);
                document.getElementById('pokeType').style.backgroundColor = typeColor;

                document.getElementById('pokeHeight').innerHTML = (pokemonData.height / 10) + ' m';
                document.getElementById('pokeWeight').innerHTML = (pokemonData.weight / 10) + ' kg';

                updateProgress('pokeHp', pokemonData.stats[0].base_stat, 'hpValue');
                updateProgress('pokeAttack', pokemonData.stats[1].base_stat, 'attackValue');
                updateProgress('pokeDefense', pokemonData.stats[2].base_stat, 'defenseValue');

                pokeCard.style.display = 'block';

                errorMsg.innerHTML = '';
                
            } 
            else {
                errorMsg.innerHTML = 'Pokémon not found!';
            }
        }
    };
    
    xhr.send();
}

function updateProgress(id, value, valueId) {
    const progressBar = document.getElementById(id);
    progressBar.style.width = (value / 2) + '%'; 
    document.getElementById(valueId).innerHTML = value;
}

function getTypeColor(type) {
    const typeColors = {
        fire: '#f08030',
        water: '#6890f0',
        grass: '#78c850',
        electric: '#f8d030',
        ground: '#e0c068',
        psychic: '#f85888',
        fairy: '#ee99ac',
        poison: '#a040b0'
    };

    return typeColors[type] || '#ffffff'; 
}
