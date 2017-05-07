import classUtil from './class-util'

class BeanHelper {
  beanSet: Map<ObjectConstructor, Object>
  constructor() {
    this.beanSet = new Map()
    let beanClassSet = classUtil.getBeanClassSet()
    for (let klass of Array.from(beanClassSet)) {
      this.beanSet.set(klass, Reflect.construct(klass, []))
    }
  }

  getBeanMap(): Map<ObjectConstructor, Object> {
    return this.beanSet
  }

  getBean(klass: ObjectConstructor): Object {
    return this.beanSet.get(klass)
  }
}

export default new BeanHelper()