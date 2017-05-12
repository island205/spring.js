import "reflect-metadata"
import { getParamsNames } from './param-names'

export const bodiesdMetadataKey = Symbol("bodies")

interface body {
  name: string | symbol,
  index: number
}

export default function body(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let paramsNames = getParamsNames(target, propertyKey)
  let bodyParameters: body[] = Reflect.getOwnMetadata(bodiesdMetadataKey, target, propertyKey) || [];
  bodyParameters.push({
    name: paramsNames[parameterIndex],
    index: parameterIndex
  });
  Reflect.defineMetadata(bodiesdMetadataKey, bodyParameters, target, propertyKey);
}