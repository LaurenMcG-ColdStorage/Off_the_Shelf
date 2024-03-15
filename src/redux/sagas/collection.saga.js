import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

function* addToCollection(action){
    try {
        const gamesResponse = yield axios.post('/api/collections', action.payload)
    }
}

function* collectionSaga(){
    yield takeEvery('ADD_GAME_COLLECTION', addToCollection);
}

export default collectionSaga;