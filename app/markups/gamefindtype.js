const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('By Name', 'name'),
        m.callbackButton('By Genre', 'genre'),
        m.callbackButton('By Teamplay', 'teamplay'),
    ], { columns: 1 }))

module.exports = markup;