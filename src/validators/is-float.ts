import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isFloat, {IsFloatOptions} from "validator/lib/isFloat";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsFloat<T> extends Validator<T> {
    readonly name: string = "is-float";
    readonly options?: ValidatorOptions<T> & IsFloatOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isFloat(value, options);
    }
}

export function isFloat<T>(properties: Properties, options?: ValidatorOptions<T> & IsFloatOptions): ValidatorInterface<T> {
    return new IsFloat<T>(normalizeProperties(properties), options);
}
