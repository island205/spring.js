import glob from 'glob'
import log4js from 'log4js'

const logger = log4js.getLogger('spring.js:class-loader.js')

class ClassLoader {
  classes: Set<ObjectConstructor>;
  constructor() {
    this.classes = new Set<ObjectConstructor>();
  }
  loadClasses(classesPath) {
    for (let classPath of glob.sync(`${classesPath}/**/*.js`)) {
      try {
        this.classes.add(<ObjectConstructor>require(classPath))
      } catch (e) {
        logger.warn(`load class from ${classPath} error`, e)
      }
    }
  }
}

export default new ClassLoader()
