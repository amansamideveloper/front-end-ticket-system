const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const travelSchema = new Schema({
    bus: {
        type: Schema.Types.ObjectId,
        ref: 'buses'
    },
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    travel_date: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Travel = mongoose.model('travels', travelSchema);