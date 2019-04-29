const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    unique: true,
    versionKey: false
});
mongoose.model('Genre', Schema);