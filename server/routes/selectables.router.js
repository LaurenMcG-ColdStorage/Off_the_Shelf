const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:mech', (req,res) => {
    const mechQuery = `SELECT * FROM "mechanics";`;

    pool
    .query(mechQuery)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
});

router.get('/:theme', (req, res) => {
    const themeQuery = `SELECT * FROM "themes";`;

    pool
    .query(themeQuery)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})
module.exports = router;