import Spring from '../../src'
import ModelAndView from '../../src/model-and-view'

const { service } = Spring

@service
class ArticleService {
  getList() {
    return Promise.resolve([])
  }
}

export default ArticleService