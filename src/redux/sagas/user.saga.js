import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({ type: 'CALL_COLLECT', payload: response.data})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// This is where we will update user collections and roles.
function* updateUserCollection(action) {
  try {
    //Grab the userdata sent by the dispatch
    const userData = action.payload;
          //Update the collections table with the new collection
    //const addCollection = yield axios.post(`/api/collection/${userData.collection}`);
          //Package the data we're trying to update
    //console.log(addCollection.data)
    // const scrubbedData = {
    //   id: userData.id,
    //   collection_id: addCollection.id,
    //   role: userData.role
    // };
    //console.log('Scrubbed data: ', scrubbedData);
    yield axios.put('/api/user', {id: userData.id, collection: userData.collection, role: userData.role});
    yield put ({type: 'FETCH_USER'});
  } catch (error) {
    console.log('User update failed', error); 
  }
} 

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('UPDATE_USER', updateUserCollection);
}

export default userSaga;
