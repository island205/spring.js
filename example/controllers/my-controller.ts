import controller from '../../src/decorators/controller'
import action from '../../src/decorators/action'
import inject from '../../src/decorators/inject'

import ModelAndView from '../../src/model-and-view'

import MyService from '../services/my-service'

@controller('/my')
class MyController {
  @inject
  myService: MyService;
  @action('get:/list')
  async list() {
    let listData = await this.myService.getList()
    return new ModelAndView('my/list', listData)
  }
}

export default MyController