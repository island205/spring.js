import { expect } from 'chai'
import controller, {controllerMetadataKey} from '../../src/decorators/controller'

@controller('/my')
class MyController {
}

describe('doecorators/controller', function () {
  it('should save path to metadata', function() {
    expect(Reflect.getMetadata(controllerMetadataKey, MyController)).to.equal('/my')
  })
})