import classLoader from '../src/class-util'
import { expect } from 'chai'
import * as path from 'path'
import ArticleController from '../example/controllers/article-controller'
import ArticleService from '../example/services/article-service'

describe('ClassUtil', function() {
  it('should load all class from class path', function() {
    classLoader.loadClass(path.join(__dirname, '../example'))
    expect(classLoader.hasClass(ArticleController)).to.equal(true)
    expect(classLoader.hasClass(ArticleService)).to.equal(true)
  })
})
