import "reflect-metadata"
import { getParamsNames } from './param-names'

export const paramsdMetadataKey = Symbol("params")

interface param {
  name: string | symbol,
  index: number
}

export default function param(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let paramsNames = getParamsNames(target, propertyKey)
  let paramParameters: param[] = Reflect.getOwnMetadata(paramsdMetadataKey, target, propertyKey) || [];
  paramParameters.push({
    name: paramsNames[parameterIndex],
    index: parameterIndex
  });
  Reflect.defineMetadata(paramsdMetadataKey, paramParameters, target, propertyKey);
}