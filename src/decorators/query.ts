import "reflect-metadata"
import { getParamsNames } from './param-names'

export const queriesdMetadataKey = Symbol("queries")

interface query {
  name: string | symbol,
  index: number
}

export default function query(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let paramsNames = getParamsNames(target, propertyKey)
  let queryParameters: query[] = Reflect.getOwnMetadata(queriesdMetadataKey, target, propertyKey) || [];
  queryParameters.push({
    name: paramsNames[parameterIndex],
    index: parameterIndex
  });
  Reflect.defineMetadata(queriesdMetadataKey, queryParameters, target, propertyKey);
}