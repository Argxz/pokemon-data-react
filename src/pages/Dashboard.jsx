import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, FETCH_POKEMONS_FAILURE, setSearchTerm } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD',
    steel: '#B7B7CE',
};

const PokemonList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pokemons, loading, error, searchTerm } = useSelector(state => {
        return state;
    });

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    const handleDetailClick = (pokemon) => {
        if (pokemon.id) {
            navigate(`/detail/${pokemon.id}`);
        } else {
            dispatch(FETCH_POKEMONS_FAILURE('ID Pokémon tidak ditemukan'));
        }
    };

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const filteredPokemons = searchTerm
        ? pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : pokemons;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="pokemon-list-container">
            <h2 className="pokedex-title">Pokedex Data</h2>
            <input
                type="text"
                placeholder="Cari Pokémon"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="pokemon-list">
            {filteredPokemons.length > 0 ? (
                    filteredPokemons.map((pokemon, index) => (
                        <div key={index} className="pokemon-card" onClick={() => handleDetailClick(pokemon)}>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
                            <p className="pokemon-name">{pokemon.name}</p>
                            <div className="pokemon-types">
                                {pokemon.types.map((type, idx) => (
                                    <span 
                                        key={idx} 
                                        className="pokemon-type" 
                                        style={{ backgroundColor: typeColors[type.type.name], color: '#000000' }}>
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Pokémon found</p>
                )}
            </div>
        </div>
    );
};

export default PokemonList;
