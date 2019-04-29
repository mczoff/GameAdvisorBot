const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('Next', 'nextgame'),
        m.callbackButton('Prev', 'prevgame')
    ], { columns: 2 }))

module.exports = markup;