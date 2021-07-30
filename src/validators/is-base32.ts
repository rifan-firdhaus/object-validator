import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isBase32 from "validator/lib/isBase32";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsBase32<T> extends Validator<T> {
    readonly name: string = "is-base32";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isBase32(value);
    }
}

export function isBase32<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsBase32<T>(normalizeProperties(properties), options);
}
