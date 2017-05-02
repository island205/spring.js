import 'reflect-metadata'

const actionMetadataKey = Symbol('action')

export default function action(path) {
  return Reflect.metadata(actionMetadataKey, path)
}