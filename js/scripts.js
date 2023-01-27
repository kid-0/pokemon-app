let pokemonRepository = (function () {

    let pokemonList = [];

    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=250/';

    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url,
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // now we add the details to the item
            item.image = details.sprites.front_default;
            item.height = details.height;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon){
        let pokemon_list = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
    
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    
        listItem.appendChild(button);
    
        pokemon_list.appendChild(listItem);
    }



    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    //now data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
    






// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height < 1.7) {
//         document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
//     } else if (pokemonList[i].height > 1.7) {
//         document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow! That's big!<br>");
//     }
// }

// pokemonRepository.getAll().forEach(function(pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });

// let pokemonList = [
//     { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
//     { name: 'Nidoran', height: 0.5, types: ['poison'] },
//     { name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal'] },
//     { name: 'Golem', height: 1.4, types: ['rock', 'ground'] },
//     { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] }
// ];