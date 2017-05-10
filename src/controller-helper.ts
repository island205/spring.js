import classUtil from './class-util'
import { actionMetadataKey } from './decorators/action'
import { controllerMetadataKey } from './decorators/controller'

interface Request {
  requestPath: string,
  requestMethod: string
}

interface Handler {
  controllerClass: ObjectConstructor,
  method: string
}

export default class ControllerHelper {
  actionMap: Map<Request, Handler>
  constructor() {
    this.actionMap = new Map()
    let controllerSet = classUtil.getControllerClassSet()
    for (let controllerClass of Array.from(controllerSet)) {
      let controllerPath = Reflect.getMetadata(controllerMetadataKey, controllerClass)
      for(let method in controllerClass.prototype) {
        if (typeof controllerClass.prototype[method] == 'function') {
          let path = Reflect.getMetadata(actionMetadataKey, controllerClass.prototype, method)
          if (path) {
            let [requestMethod, requestPath] = path.split(':')
            requestPath = controllerPath + requestPath
            this.actionMap.set({requestPath, requestMethod}, {controllerClass, method})
          }
        }
      }
    }
  }
  getActionMap(): Map<Request, Handler> {
    return this.actionMap
  }
}