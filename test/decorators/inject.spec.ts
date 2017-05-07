import { expect } from 'chai'
import inject, {injectMetadataKey} from '../../src/decorators/inject'


class MyService {
}
class MyController {
  @inject
  myService: MyService
}

describe('doecorators/inject', function () {
  it('should save inject state to metadata', function() {
    let myControlller = new MyController()
    expect(Reflect.getMetadata(injectMetadataKey, myControlller, 'myService')).to.equal(true)
  })
})