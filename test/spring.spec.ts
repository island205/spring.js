import Spring from '../src/spring'
import * as path from 'path'
import * as request from 'supertest'

const app = new Spring(path.join(__dirname, '../example'))

describe('spring.js', function () {
  it('should support @body decorator', function (done) {
    request(app.app)
      .post('/my/articles')
      .send({'name': 'spring.js'})
      .expect('spring.js', done)
  })
  it('should support @param decorator', function (done) {
    request(app.app)
      .get('/my/articles/1')
      .expect('1', done)
  })
})

