import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isLatLong from "validator/lib/isLatLong";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsLatLong<T> extends Validator<T> {
    readonly name: string = "is-lat-long";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isLatLong(value);
    }
}

export function isLatLong<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsLatLong<T>(normalizeProperties(properties), options);
}
