import "reflect-metadata"

export const paramsdMetadataKey = Symbol("params")

interface param {
  name: string | symbol,
  index: number
}

export default function param(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let paramParameters: param[] = Reflect.getOwnMetadata(paramsdMetadataKey, target, propertyKey) || [];
  paramParameters.push({
    name: propertyKey,
    index: parameterIndex
  });
  Reflect.defineMetadata(paramsdMetadataKey, paramParameters, target, propertyKey);
}