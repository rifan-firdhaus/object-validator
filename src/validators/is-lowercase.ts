import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isLowercase from "validator/lib/isLowercase";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsLowercase<T> extends Validator<T> {
    readonly name: string = "is-lowercase";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isLowercase(value);
    }
}

export function isLowercase<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsLowercase<T>(normalizeProperties(properties), options);
}
