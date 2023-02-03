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

        $(listItem).addClass("list-group-item");
    
        let button = $(`<button type="button" class="pokemon-button btn btn-primary" data-toggle="modal" data-target="#detailsModal">${pokemon.name}</button>`);

        button.on("click", () => { showDetails(pokemon); });

        $(listItem).append(button);
    
        $(pokemon_list).append(listItem);
    }



    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalHeader = document.querySelector('.modal-header');
        modalHeader.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.classList.add('modal-height');
        heightElement.innerText = 'Height: ' + pokemon.height;

        // creating a container for the pokemon image and give it a class
        let imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        //creating the image element
        let imgElement = document.createElement('img');
        imgElement.classList.add('modal-img');
        imgElement.src = pokemon.image;

        imgContainer.appendChild(imgElement);

        let modalBody = document.querySelector('.modal-body');
        modalBody.appendChild(heightElement);
        modalBody.appendChild(imgContainer);

    }

    // function showModal(pokemon) {

    //     let modalContainer = document.querySelector('.modal-container');

    //     // clear all existing content
    //     modalContainer.innerHTML = '';

    //     let modal = document.createElement('div');
    //     modal.classList.add('modal');

    //     // add new content
    //     let closeButtonElement = document.createElement('button');
    //     closeButtonElement.classList.add('modal-close');
    //     closeButtonElement.innerText = 'Close Details';
    //     closeButtonElement.addEventListener('click', hideModal);

    //     let nameElement = document.createElement('h1');
    //     nameElement.classList.add('modal-name');
    //     nameElement.innerText = pokemon.name;

    //     let heightElement = document.createElement('p');
    //     heightElement.classList.add('modal-height');
    //     heightElement.innerText = 'Height: ' + pokemon.height;

    //     //creating a container for the pokemon image and give it a class
    //     let imgContainer = document.createElement('div');
    //     imgContainer.classList.add('img-container');

    //     //creating the image element
    //     let imgElement = document.createElement('img');
    //     imgElement.classList.add('modal-img');
    //     imgElement.src = pokemon.image;

    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(nameElement);
    //     modal.appendChild(heightElement);
    //     imgContainer.appendChild(imgElement);
    //     modal.appendChild(imgContainer);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add('is-visible');

    //     modalContainer.addEventListener('click', (e) => {
    //         // since this is also triggered when clicking inside the modal we only want to close if the user clicks directly on the overlay
    //         let target = e.target;
    //         if (target === modalContainer) {
    //           hideModal();
    //         }
    //     });
    // }

    // function hideModal() {
    //     let modalContainer = document.querySelector('.modal-container');
    //     modalContainer.classList.remove('is-visible');
    // }

    // window.addEventListener('keydown', (e) => {
    //     let modalContainer = document.querySelector('.modal-container');
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //       hideModal();  
    //     }
    // });

    // document.querySelector('.pokemon-button').addEventListener('click', () => {
    //     showDetails(pokemon.name, pokemon.height);
    // });

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