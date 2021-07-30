import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isOctal from "validator/lib/isOctal";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsOctal<T> extends Validator<T> {
    readonly name: string = "is-octal";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isOctal(value);
    }
}

export function isOctal<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsOctal<T>(normalizeProperties(properties), options);
}
