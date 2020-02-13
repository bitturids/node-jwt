const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');


dotenv.config();

console.log(process.env.DB_CONNECT);

//Connect to databse
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('Connected to Db'));

//Router Middleware
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.listen(3000, () => { console.log("up and running!") });