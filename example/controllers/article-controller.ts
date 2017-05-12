import Spring from '../../src'
import ModelAndView from '../../src/model-and-view'
import ArticleService from '../services/article-service'

const { controller, action, inject, body, query, param } = Spring

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
}

export default ArticleController