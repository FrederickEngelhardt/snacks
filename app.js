const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const dogs = []

app.get('/dogs', (req, res, next) => {
  res.json({ data: dogs })
})

app.get('/dogs/:id', (req, res, next) => {
  const id = req.params.id
  const dog = dogs.find(dog => dog.id === id)
  if (!dog) return next({ status: 404, message: `Could not find dog with id of ${id}` })

  res.json({ data: dog })
})

app.post('/dogs', (req, res, next) => {
  const { name, breed } = req.body
  if (!name || !breed) return next({ status: 400, message: `Fields name and breed are required` })

  const dog = { id: uuid(), name, breed }
  dogs.push(dog)
  res.status(201).json({ data: dog })
})

app.put('/dogs/:id', (req, res, next) => {
  const id = req.params.id
  const dog = dogs.find(dog => dog.id === id)
  if (!dog) return next({ status: 404, message: `Could not find dog with id of ${id}` })

  const { name, breed } = req.body
  if (!name || !breed) return next({ status: 400, message: `Fields name and breed are required` })

  dog.name = name
  dog.breed = breed
  res.status(200).json({ data: dog })
})

app.delete('/dogs/:id', (req, res, next) => {
  const id = req.params.id
  const dog = dogs.find(dog => dog.id === id)
  if (!dog) return next({ status: 404, message: `Could not find dog with id of ${id}` })

  const index = dogs.indexOf(dog)
  dogs.splice(index, 1)
  res.status(204).json()
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
