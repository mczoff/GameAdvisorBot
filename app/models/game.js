const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    gameplay: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

let Game = mongoose.model('Game', Schema);
module.exports = Game
