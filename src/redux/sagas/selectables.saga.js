import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getGameMechanics(){
    try {
        const mechResponse = yield axios.get(`/api/select/mech`);
        yield put({type: 'SET_MECHANICS', payload: mechResponse.data})
    } catch (error) {
        console.log('Error getting game mechanics');
    }
};

function* getGameThemes(){

};

function* selectablesSaga(){
    yield takeEvery('GET_MECHANICS', getGameMechanics);
    yield takeEvery('GET_GAME_THEMES', getGameThemes);
};

export default selectablesSaga;