import { ArrayElement } from './utils';

export module IQueries {
    export enum Operator {
        Equal = '==',
        Less = '<',
        LessOrEqual = '<=',
        Greater = '>',
        GreaterOrEqual = '>=',
        ArrayContains = 'array-contains',
        ArrayContainsAny = 'array-contains-any',
        NotIn = 'not-in',
        In = 'in',
    }

    export interface Options {
        orderBy?: boolean;
        orderByDirection?: FirebaseFirestore.OrderByDirection;
    }

    export interface Value<Value> {
        operator: Operator;
        value: Value;
    }

    export interface Equal<Value> {
        operator: Operator.Equal;
        value: Value;
    }

    export interface Less<Value> {
        operator: Operator.Less;
        value: Value;
    }

    export interface LessOrEqual<Value> {
        operator: Operator.LessOrEqual;
        value: Value;
    }

    export interface Greater<Value> {
        operator: Operator.Greater;
        value: Value;
    }

    export interface GreaterOrEqual<Value> {
        operator: Operator.GreaterOrEqual;
        value: Value;
    }

    export interface ArrayContains<Value> {
        operator: Operator.ArrayContains;
        value: ArrayElement<Value>;
    }

    export interface ArrayContainsAny<Value> {
        operator: Operator.ArrayContainsAny;
        value: Value;
    }

    export interface NotIn<Value> {
        operator: Operator.NotIn;
        value: Value[];
    }

    export interface In<Value> {
        operator: Operator.In;
        value: Value[];
    }
}
