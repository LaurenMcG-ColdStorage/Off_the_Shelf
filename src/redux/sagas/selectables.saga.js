import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getGameMechanics(){
    try {
        //console.log('MECHANICS SAGA RUNNING')
        const mechResponse = yield axios.get(`/api/select`);             //Call for mechanics gathering
        yield put({type: 'SET_MECHANICS', payload: mechResponse.data});  //Store the results for handling
    } catch (error) {
        console.log('Error getting game mechanics');
    }
};

function* getGameThemes(){
    try {
        //console.log('THEME SAGA RUNNING')
        const themeResponse = yield axios.get(`/api/select/theme`);        //Call for theme gathering
        yield put ({type: 'SET_GAME_THEMES', payload: themeResponse.data});//Store for handling
    } catch (error) {
        console.log('Error getting game themes');
    }
};

function* whatsMyCollectionName(action){
    try {
        const collection = action.payload.active_collection;
        const user = action.payload.id;
        const collectResponse = yield axios.get(`/api/select/${collection}/${user}`); //Get the name of the collection, and the user's role
        yield put ({type: 'SET_COLLECT_NAME', payload: collectResponse.data});        //store the result for handling
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