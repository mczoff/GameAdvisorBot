const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const Extra = require('telegraf/extra')
const session = require('telegraf/session');
const markup = require('../markups');
const scenes = require('../scenes')
const Stage = require('telegraf/stage')

const callbackRouter = new Router(({ callbackQuery }) => {
    if (!callbackQuery.data) {
        return
    }
    const parts = callbackQuery.data.split(':')
    return {
        route: parts[0],
        state: {
            argument: parts[1]
        }
    }
})

callbackRouter.on('addgame', (ctx) => {
    return ctx.scene.enter('addgame');
})

callbackRouter.on('getgame', (ctx) => {
    return ctx.scene.enter('getgame');
})

callbackRouter.on('viewcollection', (ctx) => {
    console.log(ctx.session.gameviewcollection)
    if(ctx.session.gameviewcollection === undefined)
    {
        ctx.reply('Collection stickers was empty, write /start')
        return;
    }

    if(ctx.session.gameviewcollection.length === 0)
    {
        ctx.reply('I dont understand, write /start')
        return;
    }

    ctx.session.indexGame = 0
    const game = ctx.session.gameviewcollection[ctx.session.indexGame];

    return ctx.editMessageText(formateGameText(game), markup.Viewgame)
})

callbackRouter.on('prevgame', (ctx) => {
    if(ctx.session.gameviewcollection === undefined)
    {
        ctx.reply('Collection stickers was empty, write /start')
        return;
    }

    ctx.session.indexGame= ctx.session.indexGame - 1
    const sticker = ctx.session.gameviewcollection[ctx.session.indexGame];

    if(sticker === undefined)
    {
        ctx.editMessageText('Navigation element was deleted')
        ctx.reply('End sticker collection')
        return;
    }

    ctx.replyWithSticker(sticker.instance)
    ctx.reply('Navigate', markup.ViewStickers)
})

callbackRouter.on('nextgame', (ctx) => {
    if(ctx.session.gameviewcollection === undefined)
    {
        ctx.reply('Collection games was empty, write /start')
        return;
    }

    ctx.session.indexGame= ctx.session.indexGame + 1
    const game = ctx.session.gameviewcollection[ctx.session.indexGame];

    if(game === undefined)
    {
        ctx.editMessageText('Navigation element was deleted')
        ctx.reply('End game collection')
        return;
    }
    ctx.reply(`${game.name}`, )
})


callbackRouter.on('help', (ctx) => {
    return ctx.editMessageText('aasdassd');
})

callbackRouter.otherwise((ctx) => ctx.reply('I dont understand you, please write right command from /help'))

function formateGameText (game) {
    return `Name: ${game.name}\nGameplay: ${game.gameplay}\nGenre: ${game.genre}\nDescription: ${game.description}`
}

module.exports = callbackRouter;