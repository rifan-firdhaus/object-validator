import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isUppercase from "validator/lib/isUppercase";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsUppercase<T> extends Validator<T> {
    readonly name: string = "is-uppercase";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isUppercase(value);
    }
}

export function isUppercase<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsUppercase<T>(normalizeProperties(properties), options);
}
