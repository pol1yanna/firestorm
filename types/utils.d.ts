export type ArrayElement<Array> = Array extends (infer Element)[] ? Element : never;

export type SimpleField = number | string | boolean;

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

