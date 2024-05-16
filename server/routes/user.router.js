const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

        // Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

       // Handles POST request with new user data
        // Data required data includes: username, password, collection, email, and role.
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const collection = req.body.collection;
  const email = req.body.email;
  const role = req.body.role;

  //This query will add a new user
  const checkQuery = `SELECT "id" FROM "collections" WHERE "name" = $1;`;

  const registerTransactionOne = `WITH "ins1" AS (
                                    INSERT INTO "collections" ("name")
                                    VALUES ($1)
                                    RETURNING "id")
                                  "ins2" AS (
                                    INSERT INTO "user" ("username", "password", "active_collection", "email")
                                    SELECT $2, $3, ("id" FROM "ins1"), $4
                                    RETURNING "id"),
                                  INSERT INTO "user_collection" ("user_id", "role", "collection_id")
                                  SELECT ("id" FROM "ins2"), $5, ("id" FROM "ins1");`;
  
  const registerTransactionTwo = `WITH "ins1" AS (
                                    INSERT INTO "user" ("username", "password", "active_collection", "email")
                                    SELECT $1, $2, $3, $4
                                    RETURNING "id"),
                                  INSERT INTO "user_collection" ("user_id", "role", "collection_id")
                                  SELECT ("id" FROM "ins1"), $5, $3;`

  //Query One: Check for a collection's existence in the collections table
  pool.query(checkQuery, [collection])
  .then((result) => {
    //If the result is undefined
    if (result.rows[0] === undefined) {
      //Run the transaction to fill in the relevant tables: user, collections, user_collection
      pool.query(registerTransactionOne, [collection, username, password, email, role])
      .then((result) => {res.sendStatus(200)})  //Send OK signal on completion
      .catch((error) => {res.sendStatus(500)}); //Send an error if transaction fails
    //If the result isn't undefined
    } else {
      //Skip adding collection, and just add new user
      pool.query(registerTransactionTwo, [username, password, result.rows[0].id, email, role])
          .then((result) => {res.sendStatus(201)})  //Send OK on completion
          .catch((error) => {res.sendStatus(500)}); //Send Error on failure
    };
  })
});
        // Handles login form authenticate/login POST
        // userStrategy.authenticate('local') is middleware that we run on this route
        // this middleware will run our POST if successful
        // this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

        // clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', (req, res) => {
  //Updates active user's information
  const userData = req.body;
  console.log('User update Data: ', userData);
  const collectCheck = `SELECT "id" FROM "collections" WHERE "name" = $1;`;
  const updateCollectionQuery = `UPDATE "user" SET "active_collection" = $1 WHERE "id" = $2;`;
  const updateRoleQuery = `UPDATE "user_collection" SET "role" = $1 WHERE "user_id" = $2, "collection_id" = $3;`;
  
  //If the user sent a collection for update
  if ( userData.collection != '') {
    pool.query(collectCheck, [userData.collection])  //Get the collection id
    .then((result) => {
      //console.log('USER UPDATE: ', result.rows[0])
      pool.query(updateCollectionQuery, [result.rows[0].id, userData.id])
        .then((result) => {res.sendStatus(200)})
        .catch((error) => {res.sendStatus(500)})
    })
    .catch((error) => {res.sendStatus(500)});
  }
  //If the user sent a role for update
  if ( userData.role != '' && userData.collection != '') {
    pool.query(collectCheck, [userData.collection])  //Get the collection id
    .then((result) => {
      //Use the collection id and user id to update the desired role
      pool.query(updateRoleQuery, [userData.role, userData.id, result.rows[0].id])
        .then((result) => {
          res.sendStatus(200)})
        .catch((error) => {res.sendStatus(500)})
      // End Update Query
    })
    .catch((error) => {res.sendStatus(500)});
    //End check query
  };
});

module.exports = router;
