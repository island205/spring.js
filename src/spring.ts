import * as bodyParser from 'body-parser'
import * as log4js from 'log4js'

import classUtil from './class-util'
import ControllerHelper from './controller-helper'
import beanHelper from './bean-helper'
import iocHelper from './ioc-helper'

import { bodiesdMetadataKey } from './decorators/body'
import { queriesdMetadataKey } from './decorators/query'
import { paramsdMetadataKey } from './decorators/param'

import * as express from 'express'

const logger = log4js.getLogger('spring.js:spring.ts')

class Spring {
  app: express.Application
  controllerHelper: ControllerHelper
  constructor(springPath: string) {
    logger.debug(`Spring is start, load from ${springPath}`)
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
  }
  bindToExpress() {
    this.app = express()
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    for (let [request, handler] of Array.from(this.controllerHelper.getActionMap().entries())) {
      const {controllerClass, method} = handler
      const controllerInstance = beanHelper.getBean(controllerClass)
      const {requestPath, requestMethod} = request

      this.app[requestMethod](requestPath, (req, res, next) => {
        let args = this.buildParams(req, res, next, controllerClass, controllerInstance, method)
        controllerInstance[method].apply(controllerInstance, args)
      })

      logger.debug(`bind request map: ${requestMethod}:${requestPath} to ${controllerInstance.constructor.name}.${method}`)
    }
    return this
  }
  buildParams(
    req: express.Request & bodyParser.ParsedAsUrlencoded,
    res: express.Response,
    next: express.NextFunction,
    controllerClass: ObjectConstructor,
    controllerInstance: Object,
    method: string
  ): Array<any> {
    let args = []
    const paramTypes = Reflect.getMetadata('design:paramtypes', controllerInstance, method)
    const bodyParams = Reflect.getMetadata(bodiesdMetadataKey, controllerInstance, method)
    const queryParams = Reflect.getMetadata(queriesdMetadataKey, controllerInstance, method)
    const paramParams = Reflect.getMetadata(paramsdMetadataKey, controllerInstance, method)
    for (let bodyParam of bodyParams) {
      args[bodyParam.index] = req.body[bodyParam.name]
    }
    for (let queryParam of queryParams) {
      args[queryParam.index] = req.query[queryParam.name]
    }
    for (let paramParam of paramParams) {
      args[paramParam.index] = req.query[paramParam.name]
    }
    for(let index = 0; index < paramParams.length; index++) {
      if (paramParams[index].prototype == express.request) {
        args[index] = req
      } else if (paramParams[index].prototype == express.response) {
        args[index] = res
      }
    }
    return args
  }
  listen(port: number, hostname?: string, backlog?: number, callback?: Function) {
    this.app.listen.apply(this.app, arguments)
  }
}

export default Spring