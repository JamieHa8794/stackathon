const router = require('express').Router();
const {models: {Pokemon, Types}} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try{
        res.send(await Pokemon.findAll())
    }
    catch(err){
        next(err)
    }
})


router.put('/:id', async (req, res, next)=>{
    try{
        const pokemon = await Pokemon.findByPk(req.params.id)
        res.send(await pokemon.update({
            bagId: req.body.bagId
        }))
    }
    catch (error){
        next(error)
    }
})