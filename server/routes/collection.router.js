const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  const collectionID = req.params.id;
  //console.log('Collection code: ', collectionID);
  const collectionQuery = `SELECT "games"."title", "games"."image", "games"."id" AS "game_id", "games"."player_count", 
  "games"."play_time", "games"."mech1_id", "games"."mech2_id", "games"."mech3_id", "games"."theme_id",
  "collection_game"."played", "collection_game"."viewed", "collections"."id" AS "collection_id" FROM "games"
  JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
  JOIN "collections" ON "collection_game"."collection_id" = "collections"."id"
  WHERE "collections"."id" = $1;`;
  pool
  .query(collectionQuery, [collectionID])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    res.sendStatus(500);
  })
});

router.get('/:collection', (req, res) => {
  //This route is checking to see if a collection is in the collections table already, and returning the ID if so
  const collection = req.params.collection;
  //console.log('Check collection for: ', collection);
  const compareQuery = `SELECT "id" FROM "collections" WHERE "name" = $1;`;
  pool
  .query(compareQuery, [collection])
  .then((result) => {
    //console.log(result.rows);
    res.send(result.rows)
  })
  .catch((error) => {
    res.sendStatus(501)
  })
})

router.post('/:collection', (req, res) => {
  const newCollection = req.params.collection;
  //console.log('add collection data: ', newCollection);
  const addQuery = `INSERT INTO "collections" ("name")
                    VALUES ($1) RETURNING "id";`;
  pool
  .query(addQuery, [newCollection])
  .then((result) => {
    //console.log('Returning: ', result.rows[0])
    res.send(result.rows[0]);
  })
  .catch((error) => {
    res.sendStatus(504)
  });
});

router.put('/', (req, res) => {
  const updateArray = req.body;
  const metricUpdate = `UPDATE "collection_game" SET "viewed" = "viewed" + 1 WHERE "game_id" = $1 AND "collection_id" = $2;`;

  console.log(updateArray);
});

module.exports = router;