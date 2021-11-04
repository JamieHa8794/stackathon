import axios from 'axios';

const LOAD_POKEMON = 'LOAD_POKEMON';
const UPDATE_POKEMON = 'UPDATE_POKEMON'

const pokemonReducers = (state = [], action) =>{
    if(action.type === LOAD_POKEMON){
        state = action.pokemon;
    }
    if(action.type === UPDATE_POKEMON){
        state = state.map(pokemon => pokemon.id !== action.pokemon.id ? pokemon : action.pokemon)
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

const updatePokemon = (pokemonId, bagId, history) =>{
    return async (dispatch) =>{
        const pokemon = (await axios.put(`/api/pokemon/${pokemonId}`, {bagId})).data;
        dispatch(_updatePokemon(pokemon))
        history.push('/trainer/myBag')
    }
}

const _updatePokemon = (pokemon) =>{
    return{
        type: UPDATE_POKEMON,
        pokemon,
    }
}





export default pokemonReducers;
export {loadPokemon, updatePokemon}