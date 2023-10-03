const { Schema, model } = require('mongoose');


const DeleteSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
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
})

module.exports = model('Delete', DeleteSchema)