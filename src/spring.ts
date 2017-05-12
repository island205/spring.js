import * as bodyParser from 'body-parser'
import * as log4js from 'log4js'
import * as ejs from 'ejs'
import * as path from 'path'
import classUtil from './class-util'
import ControllerHelper from './controller-helper'
import beanHelper from './bean-helper'
import iocHelper from './ioc-helper'

import ModelAndView from './model-and-view'
import Model from './model'

import { bodiesdMetadataKey } from './decorators/body'
import { queriesdMetadataKey } from './decorators/query'
import { paramsdMetadataKey } from './decorators/param'

import * as express from 'express'

const logger = log4js.getLogger('spring.js:spring.ts')

interface SpringOptions {
    springPath: string
  }

class Spring {
  app: express.Application
  controllerHelper: ControllerHelper
  options: SpringOptions
  constructor(springPath: string) {
    this.options = {
      springPath
    }
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

    this.handleError()
  }
  createApp(): express.Application {
    const app = express()
      // view engine setup
    app.engine('ejs', ejs.renderFile)
    app.set('views', path.join(this.options.springPath, './views'))
    app.set('view engine', 'ejs')
    app.set('jsonp callback name', 'jsoncallback')
    app.set('x-powered-by', false)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    return app
  }
  bindToExpress() {
    this.app = this.createApp()
    for (let [request, handler] of Array.from(this.controllerHelper.getActionMap().entries())) {
      const {controllerClass, method} = handler
      const controllerInstance = beanHelper.getBean(controllerClass)
      const {requestPath, requestMethod} = request

      this.app[requestMethod](requestPath, (req, res, next) => {
        logger.debug(`access ${req.url} ${requestMethod}::${requestPath} to ${controllerInstance.constructor.name}.${method}`)
        const args = this.buildParams(req, res, next, controllerClass, controllerInstance, method)
        let result = controllerInstance[method].apply(controllerInstance, args)
        debugger
        if (result instanceof ModelAndView) {
          // render view
          this.renderModelAndView(result, res)
        } else if (result instanceof Model) {
          // render data
          this.renderModel(result, res)
        } else if (typeof result  === 'string') {
          result = new ModelAndView(result)
          this.renderModelAndView(result, res)
        }
    })

      logger.debug(`bind request map: ${requestMethod}:${requestPath} to ${controllerInstance.constructor.name}.${method}`)
    }
    return this
  }
  renderModelAndView(modelAndView: ModelAndView, res: express.Response) {
    res.render(modelAndView.viewPath, modelAndView.modelData)
  }
  renderModel(model: Model, res: express.Response) {
    logger.debug('renderModel', model)
    res.jsonp(model.modelData)
  }
  handleError() {
    this.app.use(function(err, req, res, next) {
      if (err) {
        logger.debug(err)
      } else {
        next()
      }
    })
  }
  buildParams(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    controllerClass: ObjectConstructor,
    controllerInstance: Object,
    method: string
  ): Array<any> {
    let args = []
    const bodyParams = Reflect.getMetadata(bodiesdMetadataKey, controllerClass.prototype, method) || []
    const queryParams = Reflect.getMetadata(queriesdMetadataKey, controllerClass.prototype, method) || []
    const paramParams = Reflect.getMetadata(paramsdMetadataKey, controllerClass.prototype, method) || []
    for (let bodyParam of bodyParams) {
      args[bodyParam.index] = req.body[bodyParam.name]
    }
    for (let queryParam of queryParams) {
      args[queryParam.index] = req.query[queryParam.name]
    }
    for (let paramParam of paramParams) {
      args[paramParam.index] = req.params[paramParam.name]
    }
    args.push(req, res, next)
    return args
  }
  listen(port: number, hostname?: string, backlog?: number, callback?: Function) {
    this.app.listen.apply(this.app, arguments)
    logger.debug(`spring.js server is start up on port ${port} now!`)
  }
}

export default Spring