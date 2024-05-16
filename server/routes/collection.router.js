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
  //The query to gather up all of the data we're going to need on the games within the selected collection
  const collectionQuery = `SELECT "games"."title", "games"."image", "games"."id" AS "game_id", "games"."player_count", 
  "games"."play_time", "games"."mech1_id", "games"."mech2_id", "games"."mech3_id", "games"."theme_id",
  "collection_game"."played", "collection_game"."viewed", "collections"."id" AS "collection_id" FROM "games"
  JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
  JOIN "collections" ON "collection_game"."collection_id" = "collections"."id"
  WHERE "collections"."id" = $1;`;
  //Calling up the database, and sending query/collection info
  pool
  .query(collectionQuery, [collectionID])
  .then((result) => {
    //Shipping back the results
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

router.post('/:collection/:id', (req, res) => {
  //This adds a new collection to the database
  const newCollection = req.params.collection;
  const userId = req.params.id;
  //console.log('add collection data: ', newCollection);
  const addQuery = `WITH "ins1" AS (
                      INSERT INTO "collections" ("name")
                      VALUES ($1) 
                      RETURNING "id"),
                    UPDATE "user" SET "active_collection" = (SELECT "id" FROM "ins1") WHERE "user_id" = $2`;
  pool
  .query(addQuery, [newCollection, userId])
  .then((result) => {res.send(result.rows[0])})  //Send back the ID of the new collection for state update.
  .catch((error) => {res.sendStatus(500)});      //Send an error on failure.
});

router.put('/view', (req, res) => {
  //Update a game's views within a collection
  const updateArray = req.body;
  const metricUpdate = `UPDATE "collection_game" SET "viewed" = "viewed" + 1 WHERE "game_id" = $1 AND "collection_id" = $2;`;

  console.log('VIEW UPDATE: ', updateArray);
  //This is supposed to loop through the viewed games, and update the views on all of them.
  updateArray.forEach(item => {
    pool.query(metricUpdate, [item.id, item.collection_id])
    .then((result) => {console.log('Completed updating: ', item.title)})
    .catch((error) => {res.sendStatus(500)});
  });
});

module.exports = router;