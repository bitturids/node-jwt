const router = require('express').Router();
const token = require('./verifyToken');
const User = require('../models/User');

router.get('/getAll', token, (req, res) => {
    User.find({}, (err, users) => {
        var userMap = {};

        users.forEach((user) => {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
})


module.exports = router;