import classUtil from './class-util'
import ControllerHelper from './controller-helper'
import beanHelper from './bean-helper'
import iocHelper from './ioc-helper'
import express from 'express'
class Spring {
  app: express.Application
  controllerHelper: ControllerHelper
  constructor(springPath: string) {
    // load class
    classUtil.loadClass(springPath)
    // initialize instance
    beanHelper.createBeanSet()
    // ioc
    iocHelper.inject()
    // generate action map
    this.controllerHelper = new ControllerHelper()
    // bind to framework
    this.bindToExpress()
    // start server
  }
  bindToExpress() {
    this.app = express()
    for (let [request, handler] of Array.from(this.controllerHelper.getActionMap().entries()) {
      const {controllerClass, method} = handler
      const controllerInstance = beanHelper.getBean(controllerClass)
      const {requestPath, requestMethod} = request

      this.app[requestMethod](requestPath, function () {
        method.apply(controllerInstance, arguments)
      })
    }
    return this
  }
  listen(port: number, hostname?: string, backlog?: number, callback?: Function) {
    this.app.listen.apply(this.app, arguments)
  }
}

export default Spring