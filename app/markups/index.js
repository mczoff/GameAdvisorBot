const typegame = require('./typegame'),
    teamplay = require('./teamplay'),
    menu = require('./menu'),
    gameview = require('./gameview'),
    viewgame = require('./viewgame')
    gamefindtype = require('./gamefindtype')
const markups = {
    Default: menu,
    TypeGame: typegame,
    Teamplay: teamplay,
    Gameview: gameview,
    GameFindType: gamefindtype,
    Viewgame: viewgame
}

module.exports = markups;