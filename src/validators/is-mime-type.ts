import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isMimeType from "validator/lib/isMimeType";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsMimeType<T> extends Validator<T> {
    readonly name: string = "is-mime-type";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isMimeType(value);
    }
}

export function isMimeType<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsMimeType<T>(normalizeProperties(properties), options);
}
