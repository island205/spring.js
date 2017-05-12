import controller from '../../src/decorators/controller'
import action from '../../src/decorators/action'
import inject from '../../src/decorators/inject'

import ModelAndView from '../../src/model-and-view'
import * as express from 'express'
import MyService from '../services/my-service'
import query from '../../src/decorators/query'
import body from '../../src/decorators/body'
import param from '../../src/decorators/param'

@controller('/my')
class MyController {
  @inject
  myService: MyService;
  @action('get::/list')
  list(
    @query name: string,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let listData = this.myService.getList()
    res.send(name)
  }
  @action('post::/articles')
  createArticle(
    @body name: string,
    req: express.Request,
    res: express.Response
  ) {
    res.send(name)
  }
  @action('get::/articles/:id')
  getArticleById(
    @param id: string,
    req,
    res: express.Response
  ) {
    res.send(id)
  }
}

export default MyController