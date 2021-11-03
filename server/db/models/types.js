const Sequelize = require('sequelize');
const db = require('../db');
const {STRING} = Sequelize.DataTypes

const Types = db.define('type', {
    type:{
        type: STRING
    },
})

module.exports = Types;
