const express = require('express');
const router = express.Router();

const { getAsync: redisGetAsync } = require('../redis');

router.get('/', async(_, res) => {
    try {
        const added_todos = await redisGetAsync('added_todos') || 0;
        res.send({
            added_todos: parseInt(added_todos)
        })
    } catch (error) {
        res.sendStatus(500);
    }
})

module.exports = router;