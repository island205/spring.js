import Spring from '../../src'
import ModelAndView from '../../src/model-and-view'

const { service } = Spring

@service
class MyService {
  getList() {
    return Promise.resolve([])
  }
}

export default MyService