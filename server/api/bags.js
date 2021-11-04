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
        const bags = await Bags.findAll()
        res.status(201).send(await Bags.create({
        }))
    }
    catch(err){
        next(err)
    }
})