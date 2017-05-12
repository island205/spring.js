import Spring from '../../src'
import ModelAndView from '../../src/model-and-view'
import MyService from '../services/my-service'

const { controller, action, inject, body, query, param } = Spring

@controller('/my')
class MyController {
  @inject
  myService: MyService;
  @action('get::/list')
  list(
    @query name: string,
    req,
    res,
    next
  ) {
    let listData = this.myService.getList()
    res.send(name)
  }
  @action('post::/articles')
  createArticle(
    @body name: string,
    req,
    res,
  ) {
    res.send(name)
  }
  @action('get::/articles/:id')
  getArticleById(
    @param id: string,
    req,
    res,
  ) {
    res.send(id)
  }
}

export default MyController