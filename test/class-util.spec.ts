import classLoader from '../src/class-util'
import { expect } from 'chai'
import * as path from 'path'
import MyController from '../example/controllers/my-controller'
import MyService from '../example/services/my-service'

describe('ClassUtil', function() {
  it('should load all class from class path', function() {
    classLoader.loadClass(path.join(__dirname, '../example'))
    expect(classLoader.hasClass(MyController)).to.equal(true)
    expect(classLoader.hasClass(MyService)).to.equal(true)
  })
})
