let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Charizard', height: 1.7, types: ['fire', 'flying'] },
        { name: 'Nidoran', height: 0.5, types: ['poison'] },
        { name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal'] },
        { name: 'Golem', height: 1.4, types: ['rock', 'ground'] },
        { name: 'Exeggutor', height: 2, types: ['psychic', 'grass'] }
    ];
    
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon)
    }

    return {
        getAll: getAll,
        add: add
    };
})();



// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height < 1.7) {
//         document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
//     } else if (pokemonList[i].height > 1.7) {
//         document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow! That's big!<br>");
//     }
// }

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " (height: " + pokemon.height + ")</p>");
});