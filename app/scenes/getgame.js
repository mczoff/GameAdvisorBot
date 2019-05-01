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

const superWizard = new WizardScene('getgame',
    (ctx) => {
        ctx.reply('Step 1. Choose any category from the menu', markups.GameFindType)
        return ctx.wizard.next()
    },
    (ctx) => {
        const currentpoint = ctx.update.callback_query.data
        ctx.session.currentpoint = currentpoint

        if(currentpoint === 'name')
            ctx.reply('Step 2. Send me the name of the game')

        if(currentpoint === 'genre')
            ctx.reply('Step 2. Send me the genre of the game', markups.TypeGame)

        if(currentpoint === 'teamplay')
            ctx.reply('Step 2. Send me the teamplay of the game', markups.Teamplay)

        return ctx.wizard.next()
    },
    (ctx) => {
        const gamecollection = []

        console.log(ctx.session.currentpoint)
        console.log(ctx.update.callback_query.data)

        if (ctx.session.currentpoint === 'name') {
            Game.find({'name': ctx.update.message.text}, function (err, docs) {
                if(err) throw err
                docs.forEach(item => gamecollection.push(item))

                ctx.session.gameviewcollection = docs
                ctx.reply('Done! You can view your games in view mode', markups.Gameview)
            })
        } else if(ctx.session.currentpoint === 'genre') {
            Game.find({'genre': ctx.update.callback_query.data}, function (err, docs) {
                if(err) throw err
                console.log(docs)
                docs.forEach(item => gamecollection.push(item))

                ctx.session.gameviewcollection = docs
                ctx.reply('Done! You can view your games in view mode', markups.Gameview)
            })
        } else {
            Game.find({'gameplay': ctx.update.callback_query.data}, function (err, docs) {
                if(err) throw err
                docs.forEach(item => gamecollection.push(item))

                ctx.session.gameviewcollection = docs
                ctx.reply('Done! You can view your games in view mode', markups.Gameview)
            })
        }
        return ctx.scene.leave()
    }
)
module.exports = superWizard