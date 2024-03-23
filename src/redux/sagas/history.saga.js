import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';


function* addPlayHistory(action) {
    try{
        const userData = action.payload
        const postResponse = yield axios.post('/api/history', userData);
        yield put ({type: 'GET_HISTORY', payload: userData.user_id})
    } catch (error) {
        console.log('Error adding new session.')
    }
} 

function* getPlayHistory(action) {
    try{
        const userData = action.payload;
        //console.log('GET SESSION SAGA DATA: ', userData);
        const getReponse = yield axios.get( `/api/history/${userData}`);
        yield put({type: 'SET_HISTORY', payload: getReponse.data});
    } catch (error) {
        console.log('Error getting play session history')
    }
};

function* playHistorySaga(){
    yield takeEvery('NEW_HISTORY', addPlayHistory);
    yield takeEvery('GET_HISTORY', getPlayHistory);
}

export default playHistorySaga;