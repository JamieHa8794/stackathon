import axios from 'axios';

const LOAD_BAGS = 'LOAD_BAGS';
const CREATE_BAG = 'CREATE_BAG';

const bagReducers = (state = [], action) =>{
    if(action.type === LOAD_BAGS){
        state = action.pokemon;
    }
    if(action.type === CREATE_BAG){
        state = [...state, action.bag]
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
        pokemon,
    }
}

const createBag = () =>{
    return async (dispatch) =>{
        const bag = (await axios.post('/api/bags')).data;
        dispatch(_createBag(bag));
    }
}

const _createBag = (bag) =>{
    return {
        type: CREATE_BAG,
        bag,
    }
}

export default bagReducers;
export {loadBags, createBag}