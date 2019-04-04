const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const session = require('telegraf/session');
const markup = require('../markups');

const router = new Router(({ callbackQuery }) => {
    if (!callbackQuery.data) {
        return
    }
    const parts = callbackQuery.data.split(':')
    return {
        route: parts[0],
        state: {
            amount: parseInt(parts[1], 10) || 0
        }
    }
})

router.on('add', (ctx) => {
    ctx.session.value = (ctx.session.value || 0) + ctx.state.amount
    return editText(ctx)
})

router.on('sub', (ctx) => {
    ctx.session.value = (ctx.session.value || 0) - ctx.state.amount
    return editText(ctx)
})

router.on('clear', (ctx) => {
    ctx.session.value = 0
    return editText(ctx)
})

router.otherwise((ctx) => ctx.reply('🌯'))

function editText (ctx) {
    if (ctx.session.value === 42) {
        return ctx.answerCbQuery('Answer to the Ultimate Question of Life, the Universe, and Everything', true)
            .then(() => ctx.editMessageText('🎆'))
    }
    return ctx.editMessageText(`Value: <b>${ctx.session.value}</b>`, markup).catch(() => undefined)
}

module.exports = router;