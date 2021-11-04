//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Pokemon = require('./models/pokemon');
const Types = require('./models/types');
const Trainers = require('./models/trainers');
const Bags = require('./models/bag');
//associations could go here!

User.hasMany(Trainers);
Trainers.belongsTo(User);

Types.hasMany(Pokemon);
Pokemon.belongsTo(Types);

Bags.hasMany(Pokemon);
Pokemon.belongsTo(Bags);
// Pokemon.hasMany(Bags);
// Bags.belongsTo(Pokemon);


Bags.hasMany(Trainers);
Trainers.belongsTo(Bags);
// Trainers.hasMany(Bags);
// Bags.belongsTo(Trainers);


module.exports = {
  db,
  models: {
    User,
    Pokemon,
    Types,
    Trainers,
    Bags,
  },
}
