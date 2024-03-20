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

  const newGame = req.body;
  console.log('Collection Router 1: ', newGame);
  const gameQuery = `SELECT "id" FROM "games" WHERE "title" = $1;`;
  const addQuery = `INSERT INTO "games" ("title", "player_count", "play_time", "mech1_id", "mech2_id", "mech3_id", "theme_id", "image")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id";`;
  const collectQuery = `INSERT INTO "collection_game" ("collection_id", "game_id") 
  VALUES ($1, $2);`;

  let newGameId = '';

  try {
    console.log('Inside game POST try: ',newGame);
    pool.query(gameQuery, [newGame.title])
    .then((result) => {
      console.log('Game Check value: ', result.rows[0]);
      newGameId = result.rows[0];
      if (newGameId != undefined) {
        console.log('Inside games POST if:');
        pool.query(collectQuery, [newGame.collection_id, newGameId.id])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          res.sendStatus(505)
        })
      } else {
        console.log('Inside games POST else:');
        pool.query(addQuery, [newGame.title, parseInt(newGame.player_count), parseInt(newGame.play_time), parseInt(newGame.mech1_id), parseInt(newGame.mech2_id), parseInt(newGame.mech3_id), parseInt(newGame.theme_id), newGame.image])
        .then((result) => {
          newGameId = result.rows[0];
          pool.query(collectQuery, [newGame.collection_id, newGameId.id])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          res.sendStatus(505)
        })
        })
        .catch((error) => {
          res.sendStatus(506)
        })
      }
    })
  } catch (error) {
    res.sendStatus(500)
  };
});

module.exports = router;