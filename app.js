const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const session = require('telegraf/session');

const GameAdvisorBotSetup = require('./app/setup');

const bot = new Telegraf("701943236:AAFnQS1qTOt62yMOcKNBe19bh3hVIWAm9Ac")
bot.use(session({ ttl: 10 }))
bot.start((ctx) => {
    ctx.session.value = 0
    return ctx.reply(`Value: <b>${ctx.session.value}</b>`, GameAdvisorBotSetup.Markups.Def)
})
bot.on('callback_query', GameAdvisorBotSetup.Routes.Def)
bot.launch()