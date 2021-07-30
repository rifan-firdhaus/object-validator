import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isHalfWidth from "validator/lib/isHalfWidth";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsHalfWidth<T> extends Validator<T> {
    readonly name: string = "is-half-width";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isHalfWidth(value);
    }
}

export function isHalfWidth<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsHalfWidth<T>(normalizeProperties(properties), options);
}
