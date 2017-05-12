import "reflect-metadata"
import getMethodParamNames  from '../utils/get-method-param-names'

export const paramNamesdMetadataKey = Symbol("paramNames")

function setParamNames(target: Object, propertyKey: string | symbol) {
  let paramNames: string[] = getMethodParamNames(target[propertyKey])
  Reflect.defineMetadata(paramNamesdMetadataKey, paramNames, target, propertyKey);
  return paramNames
}

export function getParamsNames(target: Object, propertyKey: string | symbol): string[] {
  let paramNames = Reflect.getMetadata(paramNamesdMetadataKey, target, propertyKey)
  if (paramNames) {
    return paramNames
  } else {
    return setParamNames(target, propertyKey)
  }
}