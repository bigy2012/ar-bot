const { Schema, model } = require('mongoose');


const UsersSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null,
    },
    date_added: {
        type: Date,
    },
})

module.exports = model('Users', UsersSchema)