const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/pokemon', require('./pokemon'));
router.use('/trainers', require('./trainers'));
router.use('/types', require('./types'));
router.use('/bags', require('./bags'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})