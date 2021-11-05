import axios from 'axios';

const LOAD_TRAINERS = 'LOAD_TRAINERS';
const CREATE_TRAINER_PROFILE = 'CREATE_TRAINER_PROFILE';
const UPDATE_TRAINERS = 'UPDATE_TRAINERS';

const trainerReducers = (state = [], action) =>{
    if(action.type === LOAD_TRAINERS){
        state = action.trainers;
    }
    if(action.type === CREATE_TRAINER_PROFILE){
        state = [...state, action.trainer]
    }
    if(action.type === UPDATE_TRAINERS){
        state = state.map(trainer => trainer.id !== action.trainer.id ? trainer : action.trainer)
    }
    return state;
}

const loadTrainers = () =>{
    return async (dispatch) =>{
        const trainers = (await axios.get('/api/trainers')).data;
        dispatch(_loadTrainers(trainers));
    }
}

const _loadTrainers = (trainers) =>{
    return{
        type: LOAD_TRAINERS,
        trainers,
    }
}

const createTrainerProfile = (id, firstName, lastName, imgUrl, history) =>{
    return async (dispatch) =>{
        const trainer = (await axios.post(`/api/trainers`, {id, firstName, lastName, imgUrl})).data;
        dispatch(_createTrainerProfile(trainer))
        history.push('/pokemon');
    }
}

const _createTrainerProfile = (trainer) =>{
    return{
        type: CREATE_TRAINER_PROFILE,
        trainer
    }
}

const updateTrainerInfo = (id, firstName, lastName, imgUrl, history) =>{
    return async (dispatch) =>{
        const trainer = (await axios.put(`/api/trainers/${id}`, {firstName, lastName, imgUrl})).data;
        dispatch(_updateTrainerInfo(trainer))
        history.push('/api/trainers/${id}');
    }
}

const _updateTrainerInfo = (trainer) =>{
    return{
        type: UPDATE_TRAINERS,
        trainer
    }
}

export default trainerReducers;
export {_loadTrainers, loadTrainers, createTrainerProfile, updateTrainerInfo}