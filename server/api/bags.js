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
