import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pokemons, loading, error } = useSelector(state => {
        console.log("Pokemons:", state.pokemons);
        return state;
    });

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    const handleDetailClick = (pokemon) => {
        if (pokemon.id) {
            navigate(`/detail/${pokemon.id}`);
        } else {
            console.error('ID Pokémon tidak ditemukan');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="pokemon-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
            {pokemons.map((pokemon, index) => (
                <div key={index} className="pokemon-card" onClick={() => handleDetailClick(pokemon)} style={{ padding: '10px', border: '1px solid #ddd', cursor: 'pointer', textAlign: 'center' }}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '80px', height: '80px' }} />
                    <p style={{ fontWeight: 'bold', margin: '5px 0' }}>{pokemon.name}</p>
                    <div>
                        {pokemon.types.map((type, idx) => (
                            <span key={idx} style={{ margin: '0 5px', padding: '2px 5px', backgroundColor: '#eee', borderRadius: '4px' }}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;
