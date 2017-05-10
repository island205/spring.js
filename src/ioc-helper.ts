import beanHelper from './bean-helper'
import { injectsMetadataKey } from './decorators/inject'
import * as log4js from 'log4js'

const logger = log4js.getLogger('spring.js:bean-helper')

class IocHelper {
  inject() {
    debugger
    let beanMap = beanHelper.getBeanMap()
    for (let [klass, instance] of Array.from(beanMap.entries())) {
      let injectFields = Reflect.getMetadata(injectsMetadataKey, klass.prototype);
      if (injectFields) {
        for(let field of injectFields) {
          let fieldClass = Reflect.getMetadata('design:type', klass.prototype, field)
          if (fieldClass) {
            let fieldInstance = beanHelper.getBean(fieldClass)
            if (fieldInstance) {
              Reflect.set(instance, field, fieldInstance)
              logger.debug(`inject ${fieldInstance.constructor.name} into ${instance.constructor.name}.${field}`)
            }
          }
        }
      }
    }
  }
}

export default new IocHelper()