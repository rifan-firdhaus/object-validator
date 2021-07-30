import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isFullWidth from "validator/lib/isFullWidth";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsFullWidth<T> extends Validator<T> {
    readonly name: string = "is-full-width";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isFullWidth(value);
    }
}

export function isFullWidth<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsFullWidth<T>(normalizeProperties(properties), options);
}
