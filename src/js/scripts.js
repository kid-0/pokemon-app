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

        $(listItem).addClass('list-group-item');
    
        let button = $(`<button type="button" class="pokemon-button btn btn-primary" data-toggle="modal" data-target="#detailsModal">${pokemon.name}</button>`);

        button.on('click', () => { showDetails(pokemon); });

        $(listItem).append(button);
    
        $(pokemon_list).append(listItem);
    }


    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {

        let modalBody = $('.modal-body');
        let modalHeader = $('.modal-header');
  
        modalBody.empty();
        modalHeader.text(pokemon.name);
  
        let height = $('<p>' + 'Height:  ' + pokemon.height + '</p>');
        let image = $(`<img class="pokemon-img" src="${pokemon.image}"</img>`);
          
        modalBody.append(image);
        modalBody.append(height);
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