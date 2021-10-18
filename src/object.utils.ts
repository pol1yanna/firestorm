export interface IFlatten {
  (object: Record<string | number, any>): Record<string, any>;
  (object: Record<string | number, any>, parent?: string): Record<string, any>;
}

function IsObject<T>(value: T) {
  return typeof value === 'object' && !Array.isArray(value);
}

function GetValue(value: any, field: string) {
  const isObject = IsObject(value);

  value = isObject ? Flatten(value, field) : value;

  return value;
}

export const Flatten: IFlatten = (
  object: Record<string | number, any>,
  parent?: string,
) => {
  const flattenObject: Record<string, any> = {};

  for (let [field, value] of Object.entries(object)) {
    field = parent ? `${parent}.${field}` : field;

    value = GetValue(value, field);

    flattenObject[field] = value;
  }

  return flattenObject;
};

export const ObjectUtils = {
  Flatten,
};
