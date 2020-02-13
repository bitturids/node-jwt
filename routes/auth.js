const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {

    //Check email already exist
    var userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).send("User with this email address already exist");
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    //Validate email and password regex
    var error = user.validateSync();
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    try {

        //Save user
        const savedUser = await user.save();
        res.send({ id: savedUser._id });

    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("User does not exist with this email");
    }

    //Validate password
    const decryptPassword = await bcrypt.compare(req.body.password, user.password);
    if (!decryptPassword) return res.status(400).send("Password does not match!");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


module.exports = router;