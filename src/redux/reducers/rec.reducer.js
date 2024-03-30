import { combineReducers } from "redux";

const recRequest = (state = {players: '', 
                             time: '', 
                             mech1: '', 
                             mech2: '', 
                             mech3: '', 
                             theme: '', 
                             collection_id: ''}, action) =>{
    switch (action.type) {
        case 'SET_PLAYERS' :
            return {...state, players: action.payload};
        case 'SET_TIME' :
            return {...state, time: action.payload};
        case 'SET_MECH1' :
            return {...state, mech1: action.payload};
        case 'SET_MECH2' :
            return {...state, mech2: action.payload};
        case 'SET_MECH3' :
            return {...state, mech3: action.payload};
        case 'SET_THEME' :
            return {...state, theme: action.payload};
        case 'SET_USER_COLLECT' :
            return {...state, collection_id: action.payload};
        case 'UNSET_ALL_RECS' :
            return {players: '', 
            time: '', 
            mech1: '', 
            mech2: '', 
            mech3: '', 
            theme: '', 
            collection_id: ''}
        default:
            return state;
    };
};

const recReturn = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECOMMENDATION' :
            return action.payload;
        case 'UNSET_RECOMMENDATION' :
            return [];
        default:
            return state;
    };
};

export default combineReducers({
    recRequest,
    recReturn,
})