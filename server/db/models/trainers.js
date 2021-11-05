const Sequelize = require('sequelize');
const db = require('../db');
const {INTEGER, STRING} = Sequelize.DataTypes

const Trainers = db.define('trainer', {
    firstName:{
        type: STRING
    },
    lastName:{
        type: STRING
    },
    imgUrl:{
        type: STRING(10000)
    },
    wins:{
        type: INTEGER
    },
    losses:{
        type: INTEGER
    }
})

module.exports = Trainers;
