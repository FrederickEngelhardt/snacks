const model = require('../models/snacksM.js')
const uuid = require('uuid/v4')

function getAll (req, res, next) {
    res.json({ data: model.snacks })
}

function getOne (req, res, next) {
  const id = req.params.id
  const snack = model.snacks.find(snack => snack.id === id)
  if (!snack) return next({ status: 404, message: `Could not find snack with id of ${id}` })
  res.json({ data: snack })
}

function create (req, res, next) {
  const { name, breed } = req.body
  if (!name || !breed) return next({ status: 400, message: `Fields name and breed are required` })

  const snack = { id: uuid(), name, breed }
  model.snacks.push(snack)
  res.status(201).json({ data: snack })
}

function modify (req, res, next) {
  const id = req.params.id
  const snack = model.snacks.find(snack => snack.id === id)
  if (!snack) return next({ status: 404, message: `Could not find snack with id of ${id}` })

  const { name, breed } = req.body
  if (!name || !breed) return next({ status: 400, message: `Fields name and breed are required` })

  snack.name = name
  snack.breed = breed
  res.status(200).json({ data: snack })
}
function del (req, res, next) {
  console.log('REACHED DELETE');
  const id = req.params.id
  const snack = model.snacks.find(snack => snack.id === id)
  if (!snack) return next({ status: 404, message: `Could not find snack with id of ${id}` })

  const index = model.snacks.indexOf(snack)
  model.snacks.splice(index, 1)
  res.status(204).json()
}





module.exports = {getAll, getOne, create, modify, del}
