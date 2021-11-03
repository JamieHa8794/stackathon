const Sequelize = require('sequelize');
const db = require('../db');
const {INTEGER, STRING} = Sequelize.DataTypes

const Pokemon = db.define('pokemon', {
    number:{
        type: INTEGER
    },
    name:{
        type: STRING
    },
    hp:{
        type: INTEGER
    },
    attack:{
        type: INTEGER
    },
    defense:{
        type: INTEGER
    },
    speed:{
        type: INTEGER
    },
    description:{
        type: STRING(10000)
    }

})

module.exports = Pokemon;
