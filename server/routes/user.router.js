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
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  //This query will add a new user
  const queryText = `INSERT INTO "user" ("username", "password", "collection_id", "role")
  VALUES ($1, $2, $3, $4) RETURNING "id";`;
  const collectionQuery = `INSERT INTO "collections" ("name")
  VALUES ($1) RETURNING "id";`;
  const checkQuery = `SELECT "id" FROM "collections" WHERE "name" = $1;`;

  //Query One: Check for a collection's existence in the collections table
  pool.query(checkQuery, [req.body.collection])
  .then((result) => {
    //If the result is undefined
    if (result.rows[0] === undefined) {
      //Then add the new collection to collections table
      pool.query(collectionQuery, [req.body.collection])
      .then((result) => { 
        //Finally, add user to database
        //console.log('Collection Response: ', result.rows)
        pool.query(queryText, [username, password, result.rows[0].id, req.body.role])
          .then(() => res.sendStatus(201))
          .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        res.sendStatus(500);
      })
    //If the result isn't undefined
    } else {
      //Skip adding collection, and just add new user
      pool.query(queryText, [username, password, result.rows[0].id, req.body.role])
          .then(() => res.sendStatus(201))
          .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
          });
    }
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
  const collectCheck = `SELECT * FROM "collections" WHERE "name" = $1;`;
  const updateCollectionQuery = `UPDATE "user" SET "collection_id" = $1 WHERE "id" = $2;`;
  const updateRoleQuery = `UPDATE "user" SET "role" = $1 WHERE "id" = $2;`;
  
  if ( userData.collection != '') {
    pool.query(collectCheck, [userData.collection])
    .then((result) => {
      //console.log('USER UPDATE: ', result.rows[0])
      pool.query(updateCollectionQuery, [result.rows[0].id, userData.id])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          res.sendStatus(500);
        })
    })
    .catch((error) => {
      res.sendStatus(500);
    })
  }
  if ( userData.role != '') {
      pool.query(updateRoleQuery, [userData.role, userData.id])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          res.sendStatus(500);
        })
  }
});

module.exports = router;
