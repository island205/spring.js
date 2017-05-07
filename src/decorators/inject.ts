import 'reflect-metadata'

export const injectMetadataKey = Symbol('action')

export default Reflect.metadata(injectMetadataKey, true)