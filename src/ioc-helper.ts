import beanHelper from './bean-helper'
import { injectMetadataKey } from './decorators/inject'

class IocHelper {
  inject() {
    let beanMap = beanHelper.getBeanMap()
    for (let [klass, instance] of Array.from(beanMap.entries())) {
      for(let field in instance) {
        if(Reflect.getMetadata(injectMetadataKey, instance, field)) {
          let fieldClass = Reflect.getMetadata('design:type', instance, field)
          if (fieldClass) {
            let fieldInstance = beanHelper.getBean(fieldClass)
            if (fieldInstance) {
              Reflect.set(instance, field, fieldInstance)
            }
          }
        }
      }
    }
  }
}

export default new IocHelper()