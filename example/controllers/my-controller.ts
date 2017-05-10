import controller from '../../src/decorators/controller'
import action from '../../src/decorators/action'
import inject from '../../src/decorators/inject'

import ModelAndView from '../../src/model-and-view'
import * as express from 'express'
import MyService from '../services/my-service'
import query from '../../src/decorators/query'

debugger

@controller('/my')
class MyController {
  @inject
  myService: MyService;
  @action('get:/list')
  list(
    @query name: string,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let listData = this.myService.getList()
    res.send(name)
  }
}

export default MyController