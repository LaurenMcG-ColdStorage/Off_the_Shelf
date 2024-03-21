const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

  // We start our route by defining everything we'll need.
  //This is our data packaged from the client.
  const newGame = req.body;
  //This query is to check for a game already in the games table.
  const gameQuery = `SELECT "id" FROM "games" WHERE "title" = $1;`;
  //This adds a game to the games table and grabs the new game's ID for use.
  const addQuery = `INSERT INTO "games" ("title", "player_count", "play_time", "mech1_id", "mech2_id", "mech3_id", "theme_id", "image")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id";`;
  //This adds the game to our user's collection.
  const collectQuery = `INSERT INTO "collection_game" ("collection_id", "game_id") 
  VALUES ($1, $2);`;

  //This we'll be updating and using for logic pathways.
  let newGameId = '';

  try {
    //First, check to see if a game is already in the DB
    pool.query(gameQuery, [newGame.title])
    .then((result) => {
      //Update our logic variable
      newGameId = result.rows[0];
      //If the logic variable isn't undefined (which means we have the game already)
      if (newGameId != undefined) {
        //Add game to collection
        pool.query(collectQuery, [newGame.collection_id, newGameId.id])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          res.sendStatus(500)
        })
        //If the logic variable is empty (The game is totally new)
      } else {
        pool.query(addQuery, [newGame.title, parseInt(newGame.player_count), parseInt(newGame.play_time), parseInt(newGame.mech1_id), parseInt(newGame.mech2_id), parseInt(newGame.mech3_id), parseInt(newGame.theme_id), newGame.image])
        .then((result) => {
          //Update logic variable
          newGameId = result.rows[0];
          //Update our collection
          pool.query(collectQuery, [newGame.collection_id, newGameId.id])
          .then((result) => {
            res.sendStatus(201);
          })
          .catch((error) => {
            res.sendStatus(500)
          })
        })
        .catch((error) => {
          res.sendStatus(500)
        })
      }
    })
  } catch (error) {
    res.sendStatus(500)
  };
});

router.delete('/:collection_id/:game_id', (req, res) => {
  const requestedRemoval = {collection_id: req.params.collection_id, game_id: req.params.game_id};
  console.log(requestedRemoval);
  const deleteQuery = `DELETE FROM "collection_game" WHERE "collection_id" = $1 AND "game_id" = $2;`;
  try{
    pool
    .query(deleteQuery, [requestedRemoval.collection_id, requestedRemoval.game_id])
    .then((result) => {
      res.sendStatus(240);
    })
  } catch (error) {
    res.sendStatus(500);
  };
});

module.exports = router;