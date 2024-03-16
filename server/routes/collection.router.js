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
  // POST route code here
  const newGame = req.data;
  const gameQuery = `SELECT "id" FROM "games" WHERE "title" = $1;`;
  const addQuery = `INSERT INTO "games" ("title", "player_count", "play_time", "mech1_id", "mech2_id", "mech3_id", "theme_id", "image")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURN "id";`;
  const collectQuery = `INSERT INTO "collection_game" ("collection_id", "game_id") 
                        VALUES ($1, $2);`;
  //Here we are nesting database requests to determind whether we need to add the game, and then updating the collection game table
  pool
  .query(gameQuery, [newGame.title])
  .then((result) => {
    if (result != undefined) {
      const newGameId = result.rows[0].id
      pool
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
          //End second call
      })
      .catch((error) => {
        res.sendStatus(500);
      })
      //End first call
    }
  })
});

module.exports = router;