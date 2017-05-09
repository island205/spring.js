import controller from '../../src/decorators/controller'
import action from '../../src/decorators/action'
import inject from '../../src/decorators/inject'

import ModelAndView from '../../src/model-and-view'
import express from 'express'
import MyService from '../services/my-service'
import param from '../../src/decorators/param'

@controller('/my')
class MyController {
  @inject
  myService: MyService;
  @action('get:/list')
  list(
    @param name: string,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let listData = this.myService.getList()
    return new ModelAndView('my/list', listData)
  }
}

export default MyController