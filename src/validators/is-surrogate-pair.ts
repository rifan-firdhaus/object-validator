import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isSurrogatePair from "validator/lib/isSurrogatePair";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsSurrogatePair<T> extends Validator<T> {
    readonly name: string = "is-surrogate-pair";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isSurrogatePair(value);
    }
}

export function isSurrogatePair<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsSurrogatePair<T>(normalizeProperties(properties), options);
}
