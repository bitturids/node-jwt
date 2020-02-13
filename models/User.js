const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        unique: true,
        required: true,
        min: 6,
        max: 20,
        validate: {
            validator: (v) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not valid email`
        },
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        //-validate: {
        //     validator: (v) => {
        //         return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid password!`
        // },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);