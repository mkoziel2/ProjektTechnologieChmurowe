const { Router } = require('express');
const express = require('express');
const router = express.Router({mergeParams: true});
const client = require('../config/redisClient');

client.on('connect', () => {
    console.log(`Connected to Redis.`)
});

client.on('error', (err) => {
    console.log(err)
})


router.post('/generate', async (req, res) => {
    let number = Math.random();
    number.toString(36);
    let token = number.toString(36).substr(2, 9);
    client.set(token, 'Active', "EX", 20);
    res.send(token)
})

router.post('/:token', async (req, res) => {
    let det = await client.exists(req.params.token)
    if (det == 0) {
        res.send('False')
    } else {
        res.send('True')
    }
});




module.exports = router;
