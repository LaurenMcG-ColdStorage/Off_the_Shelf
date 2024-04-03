import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getGameMechanics(){
    try {
        //console.log('MECHANICS SAGA RUNNING')
        const mechResponse = yield axios.get(`/api/select`);
        yield put({type: 'SET_MECHANICS', payload: mechResponse.data});
    } catch (error) {
        console.log('Error getting game mechanics');
    }
};

function* getGameThemes(){
    try {
        //console.log('THEME SAGA RUNNING')
        const themeResponse = yield axios.get(`/api/select/theme`);
        yield put ({type: 'SET_GAME_THEMES', payload: themeResponse.data});
    } catch (error) {
        console.log('Error getting game themes');
    }
};

function* whatsMyCollectionName(action){
    try {
        const collection = action.payload;
        const collectResponse = yield axios.get(`/api/select/${collection}`)
        yield put ({type: 'SET_COLLECT_NAME', payload: collectResponse.data[0].name})
    } catch (error) {
        console.log('Error updating collection name')
    }
}

function* selectablesSaga(){
    yield takeEvery('GET_MECHANICS', getGameMechanics);
    yield takeEvery('GET_GAME_THEMES', getGameThemes);
    yield takeEvery('CALL_COLLECT', whatsMyCollectionName);
};

export default selectablesSaga;