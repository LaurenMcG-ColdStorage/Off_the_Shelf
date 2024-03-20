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
router.post('/', async (req, res) => {

  const newGame = req.data;
  const gameQuery = `SELECT "id" FROM "games" WHERE "title" = $1;`;
  const addQuery = `INSERT INTO "games" ("title", "player_count", "play_time", "mech1_id", "mech2_id", "mech3_id", "theme_id", "image")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURN "id";`;
  const collectQuery = `INSERT INTO "collection_game" ("collection_id", "game_id") 
  VALUES ($1, $2);`;

  const newGameId = '';

  await pool
  .query(gameQuery, [newGame.title])
  .then((result) => {
    newGameId = result.rows[0].id
  })
  .catch((error) => {
    res.sendStatus(500);
  })
  //End first call

  //This will either update the games table and the collection_game table, or only the collection_game table.
  //Based on whether or not our first call returned a game id.
  if (newGameId != '') {
    await pool
      .query(addQuery, [newGame.title, newGame.player_count, newGame.play_time, newGame.mech1_id, newGame.mech2_id, newGame.mech3_id, newGame.theme_id, newGame.image])
      .then((result) => {
        //This second database call updates the collection.
        pool
        .query(collectQuery, [newGame.collection_id, newGameId])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          res.sendStatus(500);
        })
    })
  } else {
    await pool
      .query(collectQuery, [newGame.collection_id, newGameId])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
      })
  }

});

module.exports = router;