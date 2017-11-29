const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/snacksC.js')

router.get('/snacks', ctrl.getAll)
router.get('/snacks/:id', ctrl.getOne)
router.post('/snacks', ctrl.create)
router.put('/snacks/:id', ctrl.modify)
router.delete('/snacks/:id', ctrl.del)


module.exports = router
