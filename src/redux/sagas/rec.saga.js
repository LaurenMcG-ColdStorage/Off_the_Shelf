import axios from 'axios';
import { useSelector } from 'react-redux';
import { takeEvery, put } from 'redux-saga/effects';

function* getRecommendations(action){
    try {
        const findRecs = action.payload;
        console.log('GET RECS PAYLOAD: ', findRecs);
        const recReturn = useSelector((store) => store.recs.recReturn);

        const recsResponse = yield axios.get(`/api/recommend/${findRecs.collection_id}`);
        console.log('RECS RESPONSE: ', recsResponse);

        const fullCollection = recsResponse.data
        
        const filteredRecs = yield fullCollection.filter((fullCollection.players >= findRecs.players) && 
        (fullCollection.mech1_id == findRecs.mech1 || fullCollection.mech2_id == findRecs.mech1 || fullCollection.mech3_id == findRecs.mech1))
        
        yield put({ type: 'SET_RECOMMENDATION', payload: filteredRecs});
    } catch (error) {
        console.log("Can't get recs")
    }
}

function* recSaga(){
    yield takeEvery('FIND_RECS', getRecommendations)
};

export default recSaga;