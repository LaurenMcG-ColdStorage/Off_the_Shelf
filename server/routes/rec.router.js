const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    const recData = req.body;
    const reqQueryOne = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) AND
    ("games"."mech1_id" = $6 OR "games"."mech2_id" = $6 OR "games"."mech3_id" = $6) AND
    "games"."theme_id" = $7 LIMIT 3;`

    const recQueryTwo = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) AND
    "games"."theme_id" = $6 LIMIT 3;`

    const recQueryThree = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    "games"."theme_id" = $5 LIMIT 3;`

    const recQueryFour = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) LIMIT 3;`

    const recQueryFive = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) LIMIT 3;`

    switch (recData) {
        case (recData.collection_id != '' && recData.players != '' && recData.time != '' && recData.mech1 != ''&& recData.mech2 != '' && recData.mech3 != '' && recData.theme != ''):
            return pool
            .query(reqQueryOne, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.mech3, recData.theme])
            .then((result) => {
                if (result.rows.length < 3) {
                    
                }
            })
            .catch((error) => {
                res.sendStatus(500)
            });
        case (recData.collection_id != '' && recData.players != '' && recData.time != '' && recData.mech1 != '' && recData.mech2 != '' || recData.mech3 != '' && recData.theme != '')
    }
    
})

export default router;