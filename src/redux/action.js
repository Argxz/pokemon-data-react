import axios from 'axios';

export const FETCH_POKEMONS_REQUEST = 'FETCH_POKEMONS_REQUEST';
export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS';
export const FETCH_POKEMONS_FAILURE = 'FETCH_POKEMONS_FAILURE';
export const FETCH_POKEMON_DETAIL_SUCCESS = 'FETCH_POKEMON_DETAIL_SUCCESS';
export const FETCH_POKEMON_DETAIL_FAILURE = 'FETCH_POKEMON_DETAIL_FAILURE';

export const fetchPokemons = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_POKEMONS_REQUEST });
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=120');
            const pokemonList = response.data.results;
            const pokemonDetails = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const detailResponse = await axios.get(pokemon.url);
                    return detailResponse.data;
                })
            );

            dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: pokemonDetails });
        } catch (error) {
            dispatch({ type: FETCH_POKEMONS_FAILURE, error: error.message });
        }
    };
};

export const fetchPokemonDetail = (url) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(url);
            dispatch({ type: FETCH_POKEMON_DETAIL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_POKEMON_DETAIL_FAILURE, error });
        }
    };
};

export const setSearchTerm = (term) => ({
    type: 'SET_SEARCH_TERM',
    payload: term,
});