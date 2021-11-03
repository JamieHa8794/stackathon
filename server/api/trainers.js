const router = require('express').Router();
const {models: {Trainers}} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try{
        res.send(await Trainers.findAll())
    }
    catch(err){
        next(err)
    }
})
