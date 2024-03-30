import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getRecommendations(action){
    try {
        const findRecs = action.payload;
        console.log('GET RECS PAYLOAD: ', findRecs);
        const recsResponse = yield axios.post('/api/recommend', findRecs);
        console.log('RECS RESPONSE: ', recsResponse);
        yield put({ type: 'SET_RECOMMENDATION', payload: recsResponse.data})
    } catch (error) {
        console.log("Can't get recs")
    }
}

function* recSaga(){
    yield takeEvery('FIND_RECS', getRecommendations)
};

export default recSaga;