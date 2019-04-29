const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Co-op', 'coop'),
        m.callbackButton('Multiplayer', 'multiplayer'),
        m.callbackButton('Lan', 'lan'),
    ], { columns: 3 }))

module.exports = markup;