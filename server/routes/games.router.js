const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', async (req, res) => {
  const db = await pool.connect(); //This is a way for us to open a connection and hold it open for multiple stacked transactions
  try {
    // We start our route by defining everything we'll need.
    //This is our data packaged from the client.
    const newGame = req.body;
    console.log('Data To add: ', newGame)
    //This query is to check for a game already in the games table.
    const gameQuery = `SELECT "id" FROM "games" WHERE "title" = $1;`;
    //This adds a game to the games table and grabs the new game's ID for use.
    const addQuery = `
    WITH "ins1" AS (
      INSERT INTO "games" ("title", "min_players", "max_players", "min_play_time", "max_play_time", "description", "image")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id")
    INSERT INTO "game_theme" ("theme_id", "game_id")
    SELECT $8 "id" FROM "ins1"
    RETURNING "game_id";`;
    //This adds the game to our user's collection.
    const collectQuery = `INSERT INTO "collection_game" ("collection_id", "game_id", "viewed", "played") 
    VALUES ($1, $2, $3, $4);`;
    const mechanicQuery = `INSERT INTO "game_mechanic" ("game_id", "mechanic_id")
    VALUES ($1, $2);`;

    //This we'll be updating and using for logic pathways.
    let newGameId ;

    //First, check to see if a game is already in the DB
    await db.query(gameQuery, [newGame.title])
    .then((result) => {
      //Update our logic variable
      newGameId = result.rows[0];
      db.query('BEGIN'); //This starts our transaction
      //If the logic variable isn't undefined (which means we have the game already)
      if (newGameId != undefined) {
        console.log('Game Add: Existing Game')
        //Add game to collection
        db.query(collectQuery, [newGame.active_collection, newGameId.id, 0, 0])
        .then((result) => {
          res.sendStatus(201)
          db.query('COMMIT')
        }) //Return status OK, commits inserts
        .catch((error) => {
          res.sendStatus(500)
          db.query('ROLLBACK')
        }) //Return error on failure, rolls back inserts
        //If the logic variable is empty (The game is totally new)
      } else {
        console.log('Game Add: New Game');
        db.query(addQuery, [newGame.title, newGame.players[0], newGame.players[1], newGame.play_time[0], newGame.play_time[1], newGame.description, newGame.image, newGame.theme_id])
        .then((result) => {
          //Update logic variable
          newGameId = result.rows[0];
          for (mech of newGame.mechanics){
            let mechResult = db.query(mechanicQuery, [newGameId, mech.id])
          };
          db.query('COMMIT');
          //Update our collection
          pool.query(collectQuery, [newGame.active_collection, newGameId.id, 0, 0])
          .then((result) => {
            res.sendStatus(201);
          })
          .catch((error) => {
            res.sendStatus(500)
          })
        })
        .catch((error) => {
          db.query('ROLLBACK')
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
  //console.log(requestedRemoval);
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