const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req,res) => { 
    const recData = req.body;
    console.log('RECDATA: ', recData);

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

        //If the user entered all preferences
        if (recData.time != '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme != '') {
            console.log('Inside Case 1')
            pool //Query One
            .query(reqQueryOne, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.mech3, recData.theme])
            .then((result) => {
                console.log('Case 1, result 1: ', result.rows)
                if ((result.rows).length < 3) {
                    pool //Query Two, if query one doesn't yield enough results
                    .query(recQueryTwo, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.theme])
                    .then((result) => {
                        console.log('Case 1, result 2: ', result.rows)
                        if ((result.rows).length < 3) {
                            pool //Query Three, if two doesn't yield enough results
                            .query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                            .then((result) => {
                                console.log('Case 1, result 3: ', result.rows)
                                if ((result.rows).length < 3) {
                                    pool //Query Four, if three doesn't yield enough results
                                    .query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                                    .then((result) => {
                                        console.log('Case 1, result 4: ', result.rows)
                                        if ((result.rows).length < 3) {
                                            pool //Query Five, minimum criteria. Will almost definitely yield enough results
                                            .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                            .then((result) => {
                                                console.log('Case 1, result 5: ', result.rows)
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
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered everything except mech3
        else if (recData.time != '' && recData.mech2 != '' && recData.mech3 == '' && recData.theme != ''){
            console.log('Case 2')
            pool
            .query(recQueryTwo, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.theme])
            .then((result) => {
                console.log('Case 2, result 1: ', result.rows)
                if ((result.rows).length < 3) {
                    pool //Query Two, if two doesn't yield enough results
                    .query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                    .then((result) => {
                        console.log('Case 2, result 2: ', result.rows)
                        if ((result.rows).length < 3) {
                            pool //Query Three, if three doesn't yield enough results
                            .query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                console.log('Case 2, result 3: ', result.rows)
                                if ((result.rows).length < 3) {
                                    pool //Query Four, minimum criteria. Will almost definitely yield enough results
                                    .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {
                                        console.log('Case 2, result 4: ', result.rows)
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
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered everything except mech2
        else if (recData.time != '' && recData.mech2 == '' && recData.mech3 != '' && recData.theme != ''){
            console.log('Case 3: ')
            pool
            .query(recQueryTwo, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech3, recData.theme])
            .then((result) => {
                console.log('Case 3, result 1: ', result.rows)
                if ((result.rows).length < 3) {
                    pool //Query Two, if two doesn't yield enough results
                    .query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                    .then((result) => {
                        console.log('Case 3, result 2: ', result.rows)
                        if ((result.rows).length < 3) {
                            pool //Query Three, if three doesn't yield enough results
                            .query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                console.log('Case 3, result 3: ', result.rows)
                                if ((result.rows).length < 3) {
                                    pool //Query Four, minimum criteria. Will almost definitely yield enough results
                                    .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {
                                        console.log('Case 3, result 4: ', result.rows)
                                        res.send(result.rows);
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
                            res.send(result.rows);
                        }
                    })
                    .catch((error) => {res.sendStatus(500)})
                    //End Two
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered all, but only one mech
        else if (recData.time != '' && recData.mech2 == '' && recData.mech3 == '' && recData.theme != ''){
            console.log('Case 4');
            pool.query(recQueryThree, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.theme])
                .then((result) => {
                    console.log('Case 4, result 1: ', result.rows)
                    if ((result.rows).length < 3) {
                        pool.query(recQueryFour, [recData.collection_id, recData.players, recData.time, recData.mech1])
                        .then((result) => {
                            console.log('Case 4, result 2: ', result.rows)
                            if ((result.rows).length < 3) {
                                pool.query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
                                .then((result) => {
                                    console.log('Case 4, result 3: ', result.rows)
                                    res.send(result.rows)})
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
                .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered all except theme
        else if (recData.time != '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme == ''){
            pool.query(recQuerySix, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2, recData.mech3])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query(recQuerySeven, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2])
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query(recQueryEight, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                if ((result.rows).length < 3) {
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
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered two mechanics and no theme, mech2
        else if (recData.time != '' && recData.mech2 != '' && recData.mech3 == '' && recData.theme == ''){
            pool.query(recQuerySeven, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech2])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query()
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query(recQueryEight, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                if ((result.rows).length < 3) {
                                    pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {res.send(result.rows)})
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
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered two mechanics and no theme, mech3
        else if (recData.time != '' && recData.mech2 == '' && recData.mech3 != '' && recData.theme == ''){
            pool.query(recQuerySeven, [recData.collection_id, recData.players, recData.time, recData.mech1, recData.mech3])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query()
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query(recQueryEight, [recData.collection_id, recData.players, recData.time, recData.mech1])
                            .then((result) => {
                                if ((result.rows).length < 3) {
                                    pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                                    .then((result) => {res.send(result.rows)})
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
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered all but time
        else if (recData.time == '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme != ''){
            pool.query(recQueryTen, [recData.collection_id, recData.players, recData.mech1, recData.mech2, recData.mech3, recData.theme])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query(recQueryEleven, [recData.collection_id, recData.players, recData.mech1, recData.mech2, recData.theme])
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query(recQueryTwelve, [recData.collection_id, recData.players, recData.mech1, recData.theme])
                            .then((result) => {
                                if ((result.rows).length < 3) {
                                    pool.query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
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
        }
        //If the user entered two mechanics and no time, mech2
        else if (recData.time == '' && recData.mech2 != '' && recData.mech3 == '' && recData.theme != ''){
            pool.query(recQueryEleven, [recData.collection_id, recData.players, recData.mech1, recData.mech2, recData.theme])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query(recQueryTwelve, [recData.collection_id, recData.players, recData.mech1, recData.theme])
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                            .then((result) => {res.send(result.rows)})
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
        }  
        //If the user entered two mechanics and no time, mech3
        else if (recData.time == '' && recData.mech2 == '' && recData.mech3 != '' && recData.theme != ''){
            pool.query(recQueryEleven, [recData.collection_id, recData.players, recData.mech1, recData.mech3, recData.theme])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query(recQueryTwelve, [recData.collection_id, recData.players, recData.mech1, recData.theme])
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                            .then((result) => {res.send(result.rows)})
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
        }
        //If the user entered no theme and no time, all mechs
        else if  (recData.time == '' && recData.mech2 != '' && recData.mech3 != '' && recData.theme == ''){
            pool.query(recQueryThirteen, [recData.collection_id, recData.players, recData.mech1, recData.mech2, recData.mech3])
            .then((result) => {
                if ((result.rows).length < 3) {
                    pool.query(recQueryFourteen, [recData.collection_id, recData.players, recData.mech1, recData.mech2])
                    .then((result) => {
                        if ((result.rows).length < 3) {
                            pool.query()
                            .then((result) => {
                                if ((result.rows).length < 3) {
                                    pool.query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
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
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered no theme, no time, and two mechs. mech2
        else if (recData.time == '' && recData.mech2 != '' && recData.mech3 == '' && recData.theme == ''){
            pool.query(recQueryFourteen, [recData.collection_id, recData.players, recData.mech1, recData.mech2])
            .then((result) => {
                if (result.rowslength < 3) {
                    pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                    .then((result) => {res.send(result.rows)})
                    .catch((error) => {res.sendStatus(500)})
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered no theme, no time, and two mechs. mech3
        else if (recData.time == '' && recData.mech2 == '' && recData.mech3 != '' && recData.theme == ''){
            pool.query(recQueryFourteen, [recData.collection_id, recData.players, recData.mech1, recData.mech3])
            .then((result) => {
                if (result.rowslength < 3) {
                    pool.query(recQueryNine, [recData.collection_id, recData.players, recData.mech1])
                    .then((result) => {res.send(result.rows)})
                    .catch((error) => {res.sendStatus(500)})
                } else {
                    res.send(result.rows)
                }
            })
            .catch((error) => {res.sendStatus(500)})
        }
        //If the user entered minimum info
        else {
            return pool
            .query(recQueryFive, [recData.collection_id, recData.players, recData.mech1])
            .then((result) => {res.send(result.rows)})
            .catch((error) => {res.sendStatus(500)});
        }  
})

module.exports = router;