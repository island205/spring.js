import 'reflect-metadata'

const controllerMetadataKey = Symbol('controller')

export default function controller(path) {
  return Reflect.metadata(controllerMetadataKey, path)
}