import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetail } from '../redux/action';
import { useParams } from 'react-router-dom';
import '../styles/Detail.css'


const PokemonDetail = () => {
    const { pokemonId } = useParams();
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail);

    useEffect(() => {
        if (pokemonId) {
            dispatch(fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`));
        }
    }, [dispatch, pokemonId]);
    
    if (!pokemonDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-detail">
            <h2 className="pokemon-name">{pokemonDetail.name}</h2>
            <img className="pokemon-image" src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
            <div className="pokemon-info">
                <p><strong>Height:</strong> {pokemonDetail.height}</p>
                <p><strong>Weight:</strong> {pokemonDetail.weight}</p>
                <p><strong>Type:</strong> {pokemonDetail.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Abilities:</strong> {pokemonDetail.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <div className="pokemon-stats">
                    <h3>Stats:</h3>
                    <ul>
                        {pokemonDetail.stats.map(stat => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pokemon-moves">
                    <h3>Moves:</h3>
                    <ul>
                        {pokemonDetail.moves.slice(0, 5).map(move => (
                            <li key={move.move.name}>{move.move.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;