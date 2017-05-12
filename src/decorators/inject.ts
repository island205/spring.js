import 'reflect-metadata'

export const injectsMetadataKey = Symbol('injects')

export default function inject(target: Object, propertyKey: string | symbol) {
  let injectFields: (string | symbol)[] = Reflect.getOwnMetadata(injectsMetadataKey, target) || [];
  injectFields.push(propertyKey);
  Reflect.defineMetadata(injectsMetadataKey, injectFields, target);
}