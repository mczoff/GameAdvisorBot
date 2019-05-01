const mongoose = require("mongoose"),
    genreModel = require('../models/genre'),
    gameModel = require('../models/game')

const databaseModels = {
    Genre: mongoose.model('Genre'),
    Game: mongoose.model('Game')
}

module.exports = databaseModels;