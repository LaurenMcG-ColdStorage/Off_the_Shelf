import { combineReducers } from "redux";

const mechanicReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MECHANICS':
            return action.payload;
        case 'CLEAR_MECHANICS':
            return [];
        default:
            return state;
    }
};

const themeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAME_THEMES':
            return action.payload;
        case 'CLEAR_GAME_THEMES':
            return [];
        default:
            return state;
    }
};

const collectReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_COLLECT_NAME':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    mechanicReducer,
    themeReducer,
    collectReducer,
})