import * as glob from 'glob'
import * as log4js from 'log4js'
import 'reflect-metadata'
import {serviceMetadataKey} from './decorators/service'
import {controllerMetadataKey} from './decorators/controller'

const logger = log4js.getLogger('spring.js:class-util.ts')

class ClassUtils {
  classSet: Set<ObjectConstructor>;

  constructor() {
    this.classSet = new Set<ObjectConstructor>();
  }

  loadClass(classesPath) {
    for (let classPath of glob.sync(`${classesPath}/**/*.ts`)) {
      try {
        let Kclass = require(classPath)
        Kclass = Kclass.default || Kclass
        this.classSet.add(<ObjectConstructor>Kclass)
      } catch (e) {
        logger.warn(`load class from ${classPath} error`, e)
      }
    }
  }
  
  getClassSet(): Set<ObjectConstructor> {
    return this.classSet
  }

  hasClass(Kclass): boolean {
    return this.classSet.has(Kclass)
  }

  getServiceClassSet(): Set<ObjectConstructor> {
    let serviceClassSet = new  Set<ObjectConstructor>()
    for (let klass of Array.from(this.classSet)) {
      if (Reflect.getMetadata(serviceMetadataKey, klass)) {
        serviceClassSet.add(klass)
      }
    }
    return serviceClassSet
  }

  getControllerClassSet(): Set<ObjectConstructor> {
    let contollerClassSet = new  Set<ObjectConstructor>()
    for (let klass of Array.from(this.classSet)) {
      if (Reflect.getMetadata(controllerMetadataKey, klass)) {
        contollerClassSet.add(klass)
      }
    }
    return contollerClassSet
  }

  getBeanClassSet(): Set<ObjectConstructor> {
    let beanClassSet = new Set<ObjectConstructor>()
    for(let klass of Array.from(this.getControllerClassSet())) {
      beanClassSet.add(klass)
    }
    for(let klass of Array.from(this.getServiceClassSet())) {
      beanClassSet.add(klass)
    }
    return beanClassSet
  }

}

export default new ClassUtils()
