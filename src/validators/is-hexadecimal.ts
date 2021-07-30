import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isHexadecimal from "validator/lib/isHexadecimal";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsHexadecimal<T> extends Validator<T> {
    readonly name: string = "is-hexadecimal";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isHexadecimal(value);
    }
}

export function isHexadecimal<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsHexadecimal<T>(normalizeProperties(properties), options);
}
