import * as log4js from 'log4js'

import classUtil from './class-util'

const logger = log4js.getLogger('spring.js:bean-helper')

class BeanHelper {
  beanSet: Map<ObjectConstructor, Object>
  createBeanSet() {
    this.beanSet = new Map()
    let beanClassSet = classUtil.getBeanClassSet()
    for (let klass of Array.from(beanClassSet)) {
      this.beanSet.set(klass, Reflect.construct(klass, []))
    }
    logger.debug(`create ${this.beanSet.size} beans:`, Object.keys(this.beanSet))
  }

  getBeanMap(): Map<ObjectConstructor, Object> {
    return this.beanSet
  }

  getBean(klass: ObjectConstructor): Object {
    return this.beanSet.get(klass)
  }
}

export default new BeanHelper()