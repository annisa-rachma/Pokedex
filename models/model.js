
class Model {
    static listPokemon(){
        return fetch("https://pokeapi.co/api/v2/pokemon")
        .then((result) => {
           return result.json()
        })
        .then((pokemons) => {
            const pokemonPromises = pokemons.results.map((el) => {
                return fetch(el.url)
                    .then((response) => response.json())
                    .then((data) => {
                        el.data = data;
                        return el;
                    });
            });

            return Promise.all(pokemonPromises);
        })
        .catch((err) => {
            throw err
        })
    }
}

module.exports = Model