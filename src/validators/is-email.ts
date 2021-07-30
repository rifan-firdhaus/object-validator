import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isEmail, {IsEmailOptions} from "validator/lib/isEmail";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsEmail<T> extends Validator<T> {
    readonly name: string = "is-email";
    readonly options?: ValidatorOptions<T> & IsEmailOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isEmail(value, options);
    }
}

export function isEmail<T>(properties: Properties, options?: ValidatorOptions<T> & IsEmailOptions): ValidatorInterface<T> {
    return new IsEmail<T>(normalizeProperties(properties), options);
}
