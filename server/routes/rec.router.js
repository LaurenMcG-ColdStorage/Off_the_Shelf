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
    "games"."theme_id" = $7 LIMIT 3;`;

    const recQueryTwo = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) AND
    "games"."theme_id" = $6 LIMIT 3;`;

    const recQueryThree = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    "games"."theme_id" = $5 LIMIT 3;`;

    const recQueryFour = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) LIMIT 3;`;

    const recQueryFive = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) LIMIT 3;`;

    const recQuerySix = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) LIMIT 3;`;

    const recQuerySeven = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) LIMIT 3;`;

    const recQueryEight = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    "games"."play_time" <= $3 AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) LIMIT 3;`;

    const recQueryNine = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) LIMIT 3;`;

    const recQueryTen = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) AND
    "games"."theme_id" = $6 LIMIT 3;`;

    const recQueryEleven = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    "games"."theme_id" = $5 LIMIT 3;`;

    const recQueryTwelve = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) AND
    "games"."theme_id" = $4 LIMIT 3;`;

    const recQueryThirteen = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) AND
    ("games"."mech1_id" = $5 OR "games"."mech2_id" = $5 OR "games"."mech3_id" = $5) LIMIT 3;`;

    const recQueryFourteen = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) AND
    ("games"."mech1_id" = $4 OR "games"."mech2_id" = $4 OR "games"."mech3_id" = $4) LIMIT 3;`;

    const recQueryFifteen = `SELECT * FROM "games"
    JOIN "collection_game" ON "games"."id" = "collection_game"."game_id"
    WHERE "collection_game"."collection_id" = $1 AND
    "games"."player_count" <= $2 AND
    ("games"."mech1_id" = $3 OR "games"."mech2_id" = $3 OR "games"."mech3_id" = $3) LIMIT 3;`;

    switch (recData) {
        //If the user entered all preferences
        case (recData.time != '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme != ''):
            return pool //Query One
            .query(reqQueryOne, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.mech3, recData.theme])
            .then((result) => {
                if (result.rows.length < 3) {
                    pool //Query Two, if query one doesn't yield enough results
                    .query(recQueryTwo, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.theme])
                    .then((result) => {
                        if (result.rows.length < 3) {
                            pool //Query Three, if two doesn't yield enough results
                            .query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                            .then((result) => {
                                if (result.rows.length < 3) {
                                    pool //Query Four, if three doesn't yield enough results
                                    .query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                                    .then((result) => {
                                        if (result.rows.length < 3) {
                                            pool //Query Five, minimum criteria. Will almost definitely yield enough results
                                            .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                            .then((result) => {
                                                res.send(result.rows);
                                            })
                                            .catch((error) => {res.sendStatus(500)})
                                        } else {
                                            res.send(result.rows);
                                        }
                                    })
                                    .catch((error) => {res.sendStatus(500)})
                                } else {
                                    res.send(result.rows);
                                }
                            })
                            .catch((error) => {res.sendStatus(500)})
                        } else {
                            res.send(result.rows)
                        }
                    })
                    .catch((error) => {res.sendStatus(500)})
                } else {
                    res.send(result.rows);
                }
            })
            .catch((error) => {res.sendStatus(500)});
        //If the user entered everything except mech3
        case (recData.time != '' && recData.mech2 != '' && recData.mech3 == '' && recData.theme != ''):
            return pool
            .query(recQueryTwo, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.theme])
            .then((result) => {
                if (result.rows.length < 3) {
                    pool //Query Three, if two doesn't yield enough results
                    .query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                    .then((result) => {
                        if (result.rows.length < 3) {
                            pool //Query Four, if three doesn't yield enough results
                            .query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                if (result.rows.length < 3) {
                                    pool //Query Five, minimum criteria. Will almost definitely yield enough results
                                    .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {
                                        res.send(result.rows);
                                    })
                                    .catch((error) => {res.sendStatus(500)})
                                    //End Five
                                } else {
                                    res.send(result.rows);
                                }
                            })
                            .catch((error) => {res.sendStatus(500)})
                            //End Four
                        } else {
                            res.send(result.rows);
                        }
                    })
                    .catch((error) => {res.sendStatus(500)})
                    //End Three
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)});
            //End Two
        //If the user entered everything except mech2
        case (recData.time != '' && recData.mech2 == '' && recData.mech3 != '' && recData.theme != ''):
            return pool
            .query(recQueryTwo, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech3, recData.theme])
            .then((result) => {
                if (result.rows.length < 3) {
                    pool //Query Three, if two doesn't yield enough results
                    .query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                    .then((result) => {
                        if (result.rows.length < 3) {
                            pool //Query Four, if three doesn't yield enough results
                            .query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                if (result.rows.length < 3) {
                                    pool //Query Five, minimum criteria. Will almost definitely yield enough results
                                    .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {
                                        res.send(result.rows);
                                    })
                                    .catch((error) => {res.sendStatus(500)})
                                    //End Five
                                } else {
                                    res.send(result.rows);
                                }
                            })
                            .catch((error) => {res.sendStatus(500)})
                            //End Four
                        } else {
                            res.send(result.rows);
                        }
                    })
                    .catch((error) => {res.sendStatus(500)})
                    //End Three
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)});
            //End Two
        //If the user entered all except theme
        case (recData.time != '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme == ''):
            return pool.query(recQuerySix, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.mech3])
            .then((result) => {
                if (result.rows.length < 3) {
                    pool.query(recQuerySeven, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2])
                    .then((result) => {
                        if (result.rows.length < 3) {
                            pool.query(recQueryEight, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                if (result.rows.length < 3) {
                                    pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {res.send(result.rows)})
                                    .catch((error) => {res.sendStatus(500)})
                                } else {
                                    res.send(result.rows);
                                }
                            })
                            .catch((error) => {res.sendStatus(500)})
                        } else {
                            res.send(result.rows);
                        }
                    })
                    .catch((error) => {res.sendStatus(500)})
                } else {
                    res.send(result.rows);
                }
            })
            .catch((error) => {res.sendStatus(500)});
        //If the user entered all but time
        case (recData.time == '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme != ''):
            return pool.query(recQueryTen, [recData.collection_id, recData.players, recData.mech1, recData.mech2, recData.mech3, recData.theme])
            .then((result) => {
                if (result.rows.length < 3) {
                    pool.query(recQueryEleven, [recData.collection_id, recData.players, recData.mech1, recData.mech2, recData.theme])
                    .then((result) => {
                        if (result.rows.length < 3) {
                            pool.query(recQueryTwelve, [recData.collection_id, recData.players, recData.mech1, recData.theme])
                            .then((result) => {
                                if (result.rows.length < 3) {
                                    pool.query(recQueryThree, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {res.send(result.rows)})
                                    .catch((error) => {res.sendStatus(500)})
                                } else { 
                                    res.send(result.rows)}
                            })
                            .catch((error) => {res.sendStatus(500)})
                        } else {
                            res.send(result.rows)
                        }
                    })
                    .catch((error) => {res.sendStatus(500)})
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)})
        //If the user entered the bare minimum info
        default:
            return pool
            .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    }
    
})

module.exports = router;