import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//This adds a new collection to the database
function* addNewCollection(action){
    const collection = action.payload.collection;
    const userId = action.pyaload.user_id;
    try {
        const collectionResponse = yield axios.post(`/api/collection/${collection}/${userId}`);
        yield put ({type: 'GRAB_COLLECTION', payload: collectionResponse.data})
    } catch (error) {
        console.log('Unable to add collection')
    };
};

//This adds a game to a specified collection.
function* addGameToCollection(action){
    try{
        const newGame = action.payload
        //console.log('Add game saga: ', action.payload);
        const gamesResponse = yield axios.post('/api/games', newGame); //Send data to router for handling
        yield put({type: 'GRAB_COLLECTION', payload: newGame});        //Store returned data for use
    } catch (error) {
        console.log('Error adding to collection');
    };
};

function* removeGameFromCollection(action){
    try{
        const queryData = action.payload;
        const removeResponse = yield axios.delete(`/api/games/${queryData.collection_id}/${queryData.game_id}`); //Sends data for specific game removal from collection
    } catch (error) {
        console.log('Error removing game from collection');
    }
};

function* grabCollection(action){
    try {
        const collection = action.payload;
        console.log('set collection id : ', collection.active_collection);

        const collectionResponse = yield axios.get(`/api/collection/${collection.active_collection}`); //Send collection id, get collection.
        //console.log('Collectionresponse data: ', collectionResponse.data);

        yield put({type: 'SET_COLLECTION', payload: collectionResponse.data});
    
    } catch (error) {
        console.log('Error setting collection state');
    }
};

function* collectionSaga(){
    yield takeEvery('ADD_GAME_COLLECTION', addGameToCollection);
    yield takeEvery('NEW_COLLECTION', addNewCollection);
    yield takeEvery('GRAB_COLLECTION', grabCollection);
    yield takeEvery('REMOVE_TITLE', removeGameFromCollection);
};

export default collectionSaga;