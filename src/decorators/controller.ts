import 'reflect-metadata'

export const controllerMetadataKey = Symbol('controller')

export default function controller(path) {
  return Reflect.metadata(controllerMetadataKey, path)
}