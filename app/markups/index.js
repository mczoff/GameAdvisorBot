const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Add 1', 'add:1'),
        m.callbackButton('Add 10', 'add:10'),
        m.callbackButton('Add 100', 'add:100'),
        m.callbackButton('Subtract 1', 'sub:1'),
        m.callbackButton('Subtract 10', 'sub:10'),
        m.callbackButton('Subtract 100', 'sub:100'),
        m.callbackButton('🐈', Math.random().toString(36).slice(2)),
        m.callbackButton('Clear', 'clear')
    ], { columns: 3 }))

module.exports = markup;