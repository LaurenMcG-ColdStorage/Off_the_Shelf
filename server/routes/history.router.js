const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    //Store our request data for use
    const getHistory = req.params.id;
    console.log('GET ROUTE DATA: ', getHistory);
    //Conjure up a SQL query to get the game title, play date, and any stored notes from the history and games tables"
    const historyQuery = `SELECT "games"."title", "history"."date", "history"."players", "history"."notes" FROM "history" 
                          JOIN "games" ON "history"."game_id" = "games"."id"
                          WHERE "history"."user_id" = $1;`;

    pool
    .query(historyQuery, [getHistory])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    const postHistory = req.body;
    //console.log("POST ROUTE DATA: ", postHistory);
    const presentQuery = `INSERT INTO "history" ("user_id", "game_id", "date", "players", "notes")
                          VALUES ($1, $2, $3, $4, $5);`;
    const convertQuery = `SELECT "id" FROM "games" WHERE "title" = $1;`;
    const metricUpdate = `UPDATE "collection_game" SET "played" = "played" + 1 WHERE "game_id" = $1 AND "collection_id" = $2;`;
    //Query One
    pool
    .query(convertQuery, [postHistory.title])
    .then((result) => {
        const logSession = [postHistory.user_id, result.rows[0].id, postHistory.date, parseInt(postHistory.players), postHistory.notes];
        //console.log("LOG SESSION DATA: ", logSession)
        
        //Query Two
        pool
        .query(presentQuery, logSession)
        .then((result) => {
            //Query Three
            pool
            .query(metricUpdate, [logSession[1], postHistory.collection_id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500)
            })
            //End Q3
        })
        .catch((error) => {
            res.sendStatus(501);
        })
        //End Q2
    })
    .catch((error) => {
        res.sendStatus(500);
    })
    //End Q1
})

module.exports = router;