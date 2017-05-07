import 'reflect-metadata'

export const serviceMetadataKey = Symbol('service')

export default Reflect.metadata(serviceMetadataKey, true)