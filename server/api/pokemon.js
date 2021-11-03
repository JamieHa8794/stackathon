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
