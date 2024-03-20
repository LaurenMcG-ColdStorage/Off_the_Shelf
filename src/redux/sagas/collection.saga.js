import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//This adds a new collection to the database
function* addNewCollection(action){
    const collection = action.payload
    try {
        const collectionResponse = yield axios.post(`/api/collection/${collection}`)
    } catch (error) {
        console.log('Unable to add collection')
    };
};

//This adds a game to a specified collection.
function* addToCollection(action){
    try{
        const gamesResponse = yield axios.post('/api/collection', action.payload)
    } catch (error) {
        console.log('Error adding to collection');
    };
};

function* setCollection(action){
    try {
        const collection = action.payload;
        console.log('set collection id : ', collection.collection_id);

        const collectionResponse = yield axios.get(`/api/collection/${collection.collection_id}`);
        console.log('Collectionresponse data: ', collectionResponse.data);

        yield put({type: 'SET_COLLECTION', payload: collectionResponse.data});
    
    } catch (error) {
        console.log('Error setting collection state');
    }
};

function* collectionSaga(){
    yield takeEvery('ADD_GAME_COLLECTION', addToCollection);
    yield takeEvery('NEW_COLLECTION', addNewCollection);
    yield takeEvery('GRAB_COLLECTION', setCollection);
}

export default collectionSaga;