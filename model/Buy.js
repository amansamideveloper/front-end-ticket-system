const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    paymentsystem: {
        type: String,
        default: ''
    },
    travel: {
        type: Schema.Types.ObjectId,
        ref: 'travels'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Buy = mongoose.model('buyies', userSchema);