import { expect } from 'chai'
import action, {actionMetadataKey} from '../../src/decorators/action'


class MyController {
  @action('/my')
  myMethod() {
  }
}

describe('doecorators/action', function () {
  it('should save path to metadata', function() {
    let myControlller = new MyController()
    expect(Reflect.getMetadata(actionMetadataKey, myControlller, 'myMethod')).to.equal('/my')
  })
})