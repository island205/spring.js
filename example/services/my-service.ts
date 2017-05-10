import service from '../../src/decorators/service'

@service
class MyService {
  getList() {
    return Promise.resolve([])
  }
}

export default MyService