import { expect } from 'chai'
import inject, {injectsMetadataKey} from '../../src/decorators/inject'


class MyService {
}
class MyController {
  @inject
  myService: MyService
}

describe('doecorators/inject', function () {
  it('should save inject state to metadata', function() {
    let myControlller = new MyController()
    expect(Reflect.getMetadata(injectsMetadataKey, MyController.prototype).length > 0).to.equal(true)
  })
})