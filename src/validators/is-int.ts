import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isInt, {IsIntOptions} from "validator/lib/isInt";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsInt<T> extends Validator<T> {
    readonly name: string = "is-int";
    readonly options?: ValidatorOptions<T> & IsIntOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isInt(value, options);
    }
}

export function isInt<T>(properties: Properties, options?: ValidatorOptions<T> & IsIntOptions): ValidatorInterface<T> {
    return new IsInt<T>(normalizeProperties(properties), options);
}
