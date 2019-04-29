const Telegraf = require('telegraf'),
    Router = require('telegraf/router'),
    Extra = require('telegraf/extra'),
    session = require('telegraf/session'),
    mongoose = require('mongoose'),
    config = require('./config/index.js')

const Stage = require('telegraf/stage')
const GameAdvisorBotSetup = require('./app/setup');

database = require('./config/database')(mongoose, config);

const bot = new Telegraf("701943236:AAFnQS1qTOt62yMOcKNBe19bh3hVIWAm9Ac")
const stage = new Stage([GameAdvisorBotSetup.Scenes.AddGame, GameAdvisorBotSetup.Scenes.GetGame])

bot.use(session({ ttl: 10 }))
bot.use(stage.middleware())
bot.use((ctx, next) => {
    const start = new Date()
    return next(ctx).then(() => {
        const ms = new Date() - start
        console.log('Response time %sms', ms)
    })
})

bot.start((ctx) => {
    return ctx.reply(`Hi, im GameAdvisorBot, and i can help you choice game.\nChoose several params and i will offer many games to your taste`, GameAdvisorBotSetup.Markups.Default)
})

bot.on('callback_query', GameAdvisorBotSetup.Routes.CallbackRoute)

bot.command('/help', (ctx) => ctx.reply('help'))

bot.command('/about', (ctx) => ctx.reply('about'))

bot.launch()