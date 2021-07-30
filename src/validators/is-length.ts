import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isLength, {IsLengthOptions} from "validator/lib/isLength";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsLength<T> extends Validator<T> {
    readonly name: string = "is-length";
    readonly options?: ValidatorOptions<T> & IsLengthOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isLength(value, options);
    }
}

export function isLength<T>(properties: Properties, options?: ValidatorOptions<T> & IsLengthOptions): ValidatorInterface<T> {
    return new IsLength<T>(normalizeProperties(properties), options);
}
