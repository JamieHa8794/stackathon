const router = require('express').Router();
const {models: {Types}} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) =>{
    try{
        res.send(await Types.findAll())
    }
    catch(err){
        next(err)
    }
})
