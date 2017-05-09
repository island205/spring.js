import "reflect-metadata"

export const bodiesdMetadataKey = Symbol("bodies")

interface body {
  name: string | symbol,
  index: number
}

export default function body(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let bodyParameters: body[] = Reflect.getOwnMetadata(bodiesdMetadataKey, target, propertyKey) || [];
  bodyParameters.push({
    name: propertyKey,
    index: parameterIndex
  });
  Reflect.defineMetadata(bodiesdMetadataKey, bodyParameters, target, propertyKey);
}