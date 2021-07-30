import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isDecimal, {IsDecimalOptions} from "validator/lib/isDecimal";
import {Validator} from "./validator";
import {omit} from "lodash";
import {normalizeProperties} from "../object-validator";

class IsDecimal<T> extends Validator<T> {
    readonly name: string = "is-decimal";
    readonly options?: ValidatorOptions<T> & IsDecimalOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isDecimal(value, options);
    }
}

export function isDecimal<T>(properties: Properties, options?: ValidatorOptions<T> & IsDecimalOptions): ValidatorInterface<T> {
    return new IsDecimal<T>(normalizeProperties(properties), options);
}
