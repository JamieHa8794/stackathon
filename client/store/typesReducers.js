import axios from 'axios';

const LOAD_TYPES = 'LOAD_TYPES';

const typesReducers = (state = [], action) =>{
    if(action.type === LOAD_TYPES){
        state = action.types;
    }
    return state;
}

const loadTypes = () =>{
    return async (dispatch) =>{
        const types = (await axios.get('/api/types')).data;
        dispatch(_loadTypes(types));
    }
}

const _loadTypes = (types) =>{
    return{
        type: LOAD_TYPES,
        types,
    }
}



export default typesReducers;
export {loadTypes, _loadTypes}