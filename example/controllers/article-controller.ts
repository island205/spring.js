import Spring from '../../src'
import ModelAndView from '../../src/model-and-view'
import Model from '../../src/model'
import ArticleService from '../services/article-service'

const { 
  controller, action, inject, body, query, param,
} = Spring

@controller('/articles')
class ArticleController {
  @inject
  myService: ArticleService;
  @action('get::/')
  getArticleList(
    @query name: string,
    req,
    res,
    next
  ) {
    let listData = this.myService.getList()
    res.send(name)
  }
  @action('post::/')
  createArticle(
    @body name: string,
    req,
    res,
  ) {
    res.send(name)
  }
  @action('get::/:id')
  getArticleById(
    @param id: string,
    req,
    res,
  ) {
    res.send(id)
  }
  @action('put::/:id')
  updateArticleById(
    @param id: string,
    @body type: string,
  ): ModelAndView | Model {
    if (type == 'json') {
      return new Model({id})
    } 
    return new ModelAndView('article/edit', {
      id
    })
  }
  @action('get::/404')
  404(): string {
    return '404'
  }
}

export default ArticleController