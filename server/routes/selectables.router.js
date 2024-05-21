const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    //Gather all mechanics data
    const mechQuery = `SELECT * FROM "mechanics";`;
    //console.log('Mechanics Query Running')
    pool
    .query(mechQuery)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
});

router.get('/theme', (req, res) => {
    //Gather all themes data
    const themeQuery = `SELECT * FROM "themes";`;
    //console.log('Themes Query Running')
    pool
    .query(themeQuery)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})

router.get('/:id/:user', (req, res) => {
    //Gets the collection name based on the ID. THIS IS TO BE REFACTORED IN THE FUTURE, SHOULD NOT BE NECESSARY!
    const id = req.params.id;
    const callCollect = `
    SELECT "collections"."name" FROM "collections" 
    JOIN "user_collection" ON
    WHERE "id" = $1;`;

    pool
    .query(callCollect, [id])
    .then((result) => {
        //console.log('The Collection: ', result.rows)
        res.send(result.rows)
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})
module.exports = router;