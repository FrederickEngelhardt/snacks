const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/dogsC.js')

router.get('/dogs', ctrl.getAll)
router.get('/dogs/:id', ctrl.getOne)
router.post('/dogs', ctrl.create)
router.put('/dogs/:id', ctrl.modify)
router.delete('dogs/:id', ctrl.del)


module.exports = router
