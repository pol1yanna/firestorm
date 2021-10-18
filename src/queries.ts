import { IQueries } from '../types/queries';
import { ArrayElement } from '../types/utils';

export function ArrayContains<T>(
  value: ArrayElement<T>,
): IQueries.ArrayContains<T> {
  return {
    operator: IQueries.Operator.ArrayContains,
    value,
  };
}

export function ArrayContainsAny<T>(value: T): IQueries.ArrayContainsAny<T> {
  return {
    operator: IQueries.Operator.ArrayContainsAny,
    value,
  };
}

export function Equal<T>(value: T): IQueries.Equal<T> {
  return {
    operator: IQueries.Operator.Equal,
    value,
  };
}

export function Greater<T>(value: T): IQueries.Greater<T> {
  return {
    operator: IQueries.Operator.Greater,
    value,
  };
}

export function GreaterOrEqual<T>(value: T): IQueries.GreaterOrEqual<T> {
  return {
    operator: IQueries.Operator.GreaterOrEqual,
    value,
  };
}

export function In<T>(value: T[]): IQueries.In<T> {
  return {
    operator: IQueries.Operator.In,
    value,
  };
}

export function NotIn<T>(value: T[]): IQueries.NotIn<T> {
  return {
    operator: IQueries.Operator.NotIn,
    value,
  };
}

export function Less<T>(value: T): IQueries.Less<T> {
  return {
    operator: IQueries.Operator.Less,
    value,
  };
}

export function LessOrEqual<T>(value: T): IQueries.LessOrEqual<T> {
  return {
    operator: IQueries.Operator.LessOrEqual,
    value,
  };
}
