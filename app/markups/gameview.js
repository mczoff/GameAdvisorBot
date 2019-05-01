const Extra = require('telegraf/extra')

const markup = Extra
    .HTML()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('View', 'viewcollection'),
        m.callbackButton('Back', 'back')
    ], { columns: 2 }))

module.exports = markup;