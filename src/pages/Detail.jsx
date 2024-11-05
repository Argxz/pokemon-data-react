import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetail } from '../redux/action';
import { useParams } from 'react-router-dom';


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
        <div>
            <h2>{pokemonDetail.name}</h2>
            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
            <p>Height: {pokemonDetail.height}</p>
            <p>Weight: {pokemonDetail.weight}</p>
        </div>
    );
};

export default PokemonDetail;