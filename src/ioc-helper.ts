import beanHelper from './bean-helper'
import { injectMetadataKey } from './decorators/inject'
import * as log4js from 'log4js'

const logger = log4js.getLogger('spring.js:bean-helper')

class IocHelper {
  inject() {
    debugger
    let beanMap = beanHelper.getBeanMap()
    for (let [klass, instance] of Array.from(beanMap.entries())) {
      for(let field in instance) {
        if(Reflect.getMetadata(injectMetadataKey, instance, field)) {
          let fieldClass = Reflect.getMetadata('design:type', instance, field)
          if (fieldClass) {
            let fieldInstance = beanHelper.getBean(fieldClass)
            if (fieldInstance) {
              Reflect.set(instance, field, fieldInstance)
              logger.debug(`inject ${fieldInstance} into ${instance}.${field}`)
            }
          }
        }
      }
    }
  }
}

export default new IocHelper()