const model = require('../models/dogsM.js')
const uuid = require('uuid/v4')

function getAll (req, res, next) {
    res.json({ data: model.dogs })
}

function getOne (req, res, next) {
  const id = req.params.id
  const dog = model.dogs.find(dog => dog.id === id)
  if (!dog) return next({ status: 404, message: `Could not find dog with id of ${id}` })
  res.json({ data: dog })
}

function create (req, res, next) {
  const { name, breed } = req.body
  if (!name || !breed) return next({ status: 400, message: `Fields name and breed are required` })

  const dog = { id: uuid(), name, breed }
  model.dogs.push(dog)
  res.status(201).json({ data: dog })
}

function modify (req, res, next) {
  const id = req.params.id
  const dog = model.dogs.find(dog => dog.id === id)
  if (!dog) return next({ status: 404, message: `Could not find dog with id of ${id}` })

  const { name, breed } = req.body
  if (!name || !breed) return next({ status: 400, message: `Fields name and breed are required` })

  dog.name = name
  dog.breed = breed
  res.status(200).json({ data: dog })
}
function del (req, res, next) {
  console.log('REACHED DELETE');
  const id = req.params.id
  const dog = model.dogs.find(dog => dog.id === id)
  if (!dog) return next({ status: 404, message: `Could not find dog with id of ${id}` })

  const index = model.dogs.indexOf(dog)
  model.dogs.splice(index, 1)
  res.status(204).json()
}





module.exports = {getAll, getOne, create, modify, del}
