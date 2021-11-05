import axios from 'axios';

const LOAD_BAGS = 'LOAD_BAGS';
const ADD_TO_BAG = 'ADD_TO_BAG';
const REMOVE_FROM_BAG = 'REMOVE_FROM_BAG';

const bagReducers = (state = [], action) =>{
    if(action.type === LOAD_BAGS){
        state = action.bag;
    }
    if(action.type === ADD_TO_BAG){
        state = [...state, action.bag]
    }
    if(action.type === REMOVE_FROM_BAG){
        state = state.filter(bag => bag.id !== action.bagId)
    }
    return state;
}

const loadBags = () =>{
    return async (dispatch) =>{
        const bag = (await axios.get('/api/bags')).data;
        dispatch(_loadBags(bag));
    }
}

const _loadBags = (bag) =>{
    return{
        type: LOAD_BAGS,
        bag,
    }
}


const addToBag = (trainerId, pokemonId, history) =>{
    return async (dispatch) =>{
        const bag = (await axios.post('/api/bags', {trainerId, pokemonId})).data;
        dispatch(_addToBag(bag));
        history.push('/trainer/myBag')
    }
}

const _addToBag = (bag) =>{
    return {
        type: ADD_TO_BAG,
        bag,
    }
}

const removeFromBag = (bagId, history) =>{
    return async (dispatch) =>{
        axios.delete(`/api/bags/${bagId}`)
        dispatch(_removeFromBag(bagId))
        // history.push(`/trainer/myBag`)
    }
}

const _removeFromBag = (bagId) =>{
    return {
        type: REMOVE_FROM_BAG,
        bagId,
    }
} 

export default bagReducers;
export {_loadBags, loadBags, addToBag, removeFromBag}