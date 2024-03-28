import { combineReducers } from 'redux';
import recs from './rec.reducer';
import selectables from './selectables.reducer'
import gameHistory from './history.reducer';
import collection from './collection.reducer';
import errors from './errors.reducer';
import user from './user.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id, username, collection, and role if someone is logged in
  collection, //This will hold all of the games in the specified collection.
  gameHistory, //This will hold all of the play sessions that a user has logged.
  selectables, //This will hold game themes and mechanics for use in logging
  recs, //This holds the selections a user makes, and then the recommendations derived, within the recommend feature
});

export default rootReducer;
