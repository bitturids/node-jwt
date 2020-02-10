const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
//Connect to databse
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to Db'));


//Import Routes
const authRoute = require('./routes/auth');

app.listen(3000, () => { console.log("up and running!") });

//Router Middleware
app.use('/api/user', authRoute);