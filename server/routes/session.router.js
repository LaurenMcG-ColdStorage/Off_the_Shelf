const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const getHistory = req.body;
    const historyQuery = `SELECT * FROM "history" WHERE "user_id" = $1;`;
    
    pool
    .query(historyQuery, [getHistory.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {

})

module.exports = router;