import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isMultibyte from "validator/lib/isMultibyte";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsMultibyte<T> extends Validator<T> {
    readonly name: string = "is-multibyte";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isMultibyte(value);
    }
}

export function isMultibyte<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsMultibyte<T>(normalizeProperties(properties), options);
}
