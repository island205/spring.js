import "reflect-metadata"

export const queriesdMetadataKey = Symbol("queries")

interface query {
  name: string | symbol,
  index: number
}

export default function query(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  debugger
  let queryParameters: query[] = Reflect.getOwnMetadata(queriesdMetadataKey, target, propertyKey) || [];
  queryParameters.push({
    name: propertyKey,
    index: parameterIndex
  });
  Reflect.defineMetadata(queriesdMetadataKey, queryParameters, target, propertyKey);
}