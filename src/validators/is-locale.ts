import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isLocale from "validator/lib/isLocale";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsLocale<T> extends Validator<T> {
    readonly name: string = "is-locale";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isLocale(value);
    }
}

export function isLocale<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsLocale<T>(normalizeProperties(properties), options);
}
