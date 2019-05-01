const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const database = require('../database')
const Game = require('../models/game')
const markups = require('../markups')
const mongoose = require('mongoose');

const superWizard = new WizardScene('addgame',
    (ctx) => {
        ctx.reply('Step 1. Send me the name of the game')
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.reply('Step 2. Send me the description of the game')
        ctx.session.gamename = ctx.update.message.text
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.reply('Step 3. Select me the type team play of the game', markups.Teamplay)
        ctx.session.gamedesc = ctx.update.message.text
        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.reply('Step 4. Send me the genre of the game', markups.TypeGame)
        ctx.session.gameplay = ctx.update.callback_query.data

        return ctx.wizard.next()
    },
    (ctx) => {
        ctx.session.gametype = ctx.update.callback_query.data
        console.log(ctx.session)
        ctx.reply('Done! You can see your game in bot storage')

        let gameobj = new Game({
            _id: new mongoose.Types.ObjectId(),
            name: ctx.session.gamename,
            description: ctx.session.gamename,
            gameplay: ctx.session.gameplay,
            genre: ctx.session.gametype
        })

        gameobj.save(function (err) {
            if(err) throw err
        })

        return ctx.scene.leave()
    }
)
module.exports = superWizard