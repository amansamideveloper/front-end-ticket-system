const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Bus = mongoose.model('bus', busSchema);