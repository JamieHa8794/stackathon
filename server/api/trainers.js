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


router.post('/', async (req, res, next)=>{
    try{
        res.status(201).send(await Trainers.create({
            userId: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            imgUrl: req.body.imgUrl,
            wins: 0,
            losses: 0,
        }))
    }
    catch (error){
        next(error)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
        const trainer = await Trainers.findByPk(req.params.id)
        res.send(await trainer.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            imgUrl: req.body.imgUrl,
            wins: req.body.win,
            losses: req.body.loss
        }))
    }
    catch (error){
        next(error)
    }
})