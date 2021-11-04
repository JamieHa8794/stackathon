'use strict'

const {db, models: {User, Pokemon, Trainers, Types, Bags} } = require('../server/db')
const pokemonData = require('../server/db/models/pokemonData')
const pokemonList = [...pokemonData.list()]
const pokemonTypes = [...pokemonData.typeList()]

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
  ])


  const typesArr = await Promise.all(
    pokemonTypes.map(type =>{
      return(
        Types.create({
          type: `${type}`
        })
      )
    })
  )


  const pokemon = await Promise.all(
    pokemonList.map(_pokemon =>{
      return(
        Pokemon.create({
            id: _pokemon.number,
            number: _pokemon.number,
            name: _pokemon.name,
            typeId: (typesArr.find(type => type.type === _pokemon.type).id),
            hp: _pokemon.hp,
            attack: _pokemon.attack,
            defense: _pokemon.defense,
            speed: _pokemon.speed, 
            description: _pokemon.description
        })
      )
    })
  )

  const [Jamie] = await Promise.all([
    //Trainers.create({firstName: 'Jamie', lastName: 'Ha', imgUrl: ''})
  ])

  const bag = await Promise.all([
    Bags.create({id: -1000})
  ])



  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
