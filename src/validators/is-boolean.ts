import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isBoolean from "validator/lib/isBoolean";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsBoolean<T> extends Validator<T> {
    readonly name: string = "is-boolean";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isBoolean(value);
    }
}

export function isBoolean<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsBoolean<T>(normalizeProperties(properties), options);
}
