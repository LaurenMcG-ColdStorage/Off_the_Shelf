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
  pool.query(collectionQuery, [req.body.collection])
  .then((result) => { 
    console.log('Collection Response: ', result.rows)
    pool
      .query(queryText, [username, password, result.rows[0].id, req.body.role])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });

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
  const userData = req.body;
  console.log('User update Data: ', userData);
  const collectCheck = `SELECT * FROM "collections" WHERE "name" = $1;`;
  const updateQuery = `UPDATE "user" SET "collection_id" = $1, "role" = $2 WHERE "id" = $3;`;
  
  
  pool.query(collectCheck, [userData.collection])
  .then((result) => {
    console.log('USER UPDATE: ', result.rows[0])
    pool.query(updateQuery, [result.rows[0].id, userData.role, userData.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.sendStatus(500);
      })
  })
});

module.exports = router;
