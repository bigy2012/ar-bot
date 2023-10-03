const { Schema, model } = require('mongoose');


const TimeSetSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        required: true
    },
    date_updated: {
        type: Date,
        default: null,
    },
    start_date_time: {
        type: Date,
    },
})

module.exports = model('TimeSet', TimeSetSchema)