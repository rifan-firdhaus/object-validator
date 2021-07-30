import {Condition} from "src/utilities/condition";

export type Properties = string | string[];
export type NormalizedProperties = string[];
export type AllValidationMessages = {
    valid: ValidationMessages,
    invalid: ValidationMessages,
}
export type ValidationMessages = {
    [key: string]: string[]
}

export interface PropertyValidities {
    [key: string]: boolean;
}

export type PropertyValidity = boolean | Promise<boolean>;


export type ValidatorFunction<T> = (value: any, object: T) => PropertyValidity;
export type ValidatorMessageFunction<T> = (value: any, property: string, data: T, options: ValidatorOptions<T>) => string;

export interface ValidatorOptions<T> {
    if?: Condition<T> | boolean | Promise<boolean> | Condition<T>[];
    invalidMessage?: ValidatorMessageFunction<T> | string;
    validMessage?: ValidatorMessageFunction<T> | string;
}

export interface ValidatorInterface<T> {
    name: string;
    properties: NormalizedProperties;
    options?: ValidatorOptions<T>;
    defaultInvalidMessage?: ValidatorMessageFunction<T>;
    defaultValidMessage?: ValidatorMessageFunction<T>;
    validate: ValidatorFunction<T>
}

export const rootValidatorOptionKeys = ['if', 'message'];

