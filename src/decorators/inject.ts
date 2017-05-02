import 'reflect-metadata'

const injectMetadataKey = Symbol('action')

export default Reflect.metadata(injectMetadataKey, true)