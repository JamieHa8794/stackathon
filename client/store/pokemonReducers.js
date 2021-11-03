import axios from 'axios';

const LOAD_POKEMON = 'LOAD_POKEMON';

const pokemonReducers = (state = [], action) =>{
    if(action.type === LOAD_POKEMON){
        state = action.pokemon;
    }
    return state;
}

const loadPokemon = () =>{
    return async (dispatch) =>{
        const pokemon = (await axios.get('/api/pokemon')).data;
        dispatch(_loadPokemon(pokemon));
    }
}

const _loadPokemon = (pokemon) =>{
    return{
        type: LOAD_POKEMON,
        pokemon,
    }
}

export default pokemonReducers;
export {loadPokemon}