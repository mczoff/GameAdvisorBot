const Extra = require('telegraf/extra')
const database = require('../database')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Action', 'action'),
        m.callbackButton('Arcade', 'arcade'),
        m.callbackButton('Logic', 'logic'),
        m.callbackButton('RPG', 'rpg'),
        m.callbackButton('Racing', 'racing'),
        m.callbackButton('Shooter', 'shooter'),
        m.callbackButton('Simulator', 'simulator'),
        m.callbackButton('Sport', 'sport'),
        m.callbackButton('Strategy', 'strategy')
    ], {columns: 3}))

module.exports = markup;