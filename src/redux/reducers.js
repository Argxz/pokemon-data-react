import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMONS_FAILURE,
    FETCH_POKEMON_DETAIL_SUCCESS,
    FETCH_POKEMON_DETAIL_FAILURE
} from './action';

const initialState = {
    pokemons: [],
    pokemonDetail: null,
    loading: false,
    error: null
};

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEMONS_REQUEST:
            return { ...state, loading: true };
        case FETCH_POKEMONS_SUCCESS:
            return { ...state, loading: false, pokemons: action.payload };
        case FETCH_POKEMONS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case FETCH_POKEMON_DETAIL_SUCCESS:
            return { ...state, pokemonDetail: action.payload };
        case FETCH_POKEMON_DETAIL_FAILURE:
            return { ...state, pokemonDetail: action.error };
        default:
            return state;
    }
};

export default pokemonReducer;
