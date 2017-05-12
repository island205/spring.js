import Spring from '../src/spring'
import * as path from 'path'
import * as request from 'supertest'

const app = new Spring(path.join(__dirname, '../example'))

describe('spring.js', function () {
  it('should support @body decorator', function (done) {
    request(app.app)
      .post('/articles')
      .send({'name': 'spring.js'})
      .expect('spring.js', done)
  })
  it('should support @param decorator', function (done) {
    request(app.app)
      .get('/articles/1')
      .expect('1', done)
  })
  it('should render model into view', function (done) {
    request(app.app)
      .put('/articles/12345')
      .expect(function (res) {
        if (res.text.indexOf('12345') == -1) {
          throw Error('id is not match')
        }
      })
      .end(done)
  })
  it('should render model into json', function (done) {
    request(app.app)
      .put('/articles/12345')
      .send({type: 'json'})
      .expect({id: '12345'}, done)
  })
  it('should render string result as view path', function (done) {
    request(app.app)
      .get('/articles/404')
      .expect('404', done)
  })
})

