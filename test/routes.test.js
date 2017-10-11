const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Dogs Resources', function () {
  describe('POST /', function () {
    it('should create a dog', function (done) {
      const dog = { name: 'Wilfred', breed: 'Golden Retriever' }
      chai.request(app)
        .post('/dogs')
        .send(dog)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.at.least(0)
          expect(res.body.data.name).to.equal(dog.name)
          expect(res.body.data.breed).to.equal(dog.breed)
          done()
        })
    })

    it('should return an error if name is missing', function (done) {
      const dog = { breed: 'Golden Retriever' }
      chai.request(app)
        .post('/dogs')
        .send(dog)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if breed is missing', function (done) {
      const dog = { name: 'Wilfred' }
      chai.request(app)
        .post('/dogs')
        .send(dog)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the dogs', function (done) {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const dog = res.body.data[0]
          expect(dog).to.be.an('object')
          expect(dog.id).to.be.at.least(0)
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single dog specified', function (done) {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const dog = res.body.data[0]
          chai.request(app)
            .get(`/dogs/${dog.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(dog.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a dog', function (done) {
      chai.request(app)
        .get('/dogs/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing dog when all information is provided', function (done) {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const dog = res.body.data[0]
          const newInfo = { name: 'Willy', breed: 'Black Lab/Golden Retriever Mix' }
          chai.request(app)
            .put(`/dogs/${dog.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.at.least(0)
              expect(res.body.data.name).to.equal(newInfo.name)
              expect(res.body.data.breed).to.equal(newInfo.breed)
              done()
            })
        })

    })

    it('should return an error if name is missing', function (done) {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const dog = res.body.data[0]
          const newInfo = { breed: 'Black Lab/Golden Retriever Mix' }
          chai.request(app)
            .put(`/dogs/${dog.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if breed is missing', function (done) {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const dog = res.body.data[0]
          const newInfo = { name: 'Willy' }
          chai.request(app)
            .put(`/dogs/${dog.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified dog', function (done) {
      chai.request(app)
        .get('/dogs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const dog = res.body.data[0]
          chai.request(app)
            .delete(`/dogs/${dog.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/dogs/${dog.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/dogs/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
