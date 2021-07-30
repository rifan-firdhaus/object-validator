import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isSemVer from "validator/lib/isSemVer";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsSemVer<T> extends Validator<T> {
    readonly name: string = "is-sem-ver";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isSemVer(value);
    }
}

export function isSemVer<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsSemVer<T>(normalizeProperties(properties), options);
}
