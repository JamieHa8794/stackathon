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
    imgURL:{
        type: STRING(10000)
    },
})

module.exports = Trainers;
