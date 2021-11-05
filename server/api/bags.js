const router = require('express').Router();
const {models: {Bags}} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try{
        res.send(await Bags.findAll())
    }
    catch(err){
        next(err)
    }
})

router.post('/', async(req, res, next) =>{
    try{
        res.status(201).send(await Bags.create({
            trainerId: req.body.trainerId,
            pokemonId: req.body.pokemonId
        }))
    }
    catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) =>{
    try{
      const bag = await Bags.findByPk(req.params.id)
      await bag.destroy();
      res.sendStatus(204);
    }
    catch(err){
      next(err)
    } 
  })