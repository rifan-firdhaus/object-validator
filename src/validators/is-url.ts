import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isURL, {IsURLOptions} from "validator/lib/isURL";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsURL<T> extends Validator<T> {
    readonly name: string = "is-url";
    readonly options?: ValidatorOptions<T> & IsURLOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isURL(value, options);
    }
}

export function isURL<T>(properties: Properties, options?: ValidatorOptions<T> & IsURLOptions): ValidatorInterface<T> {
    return new IsURL<T>(normalizeProperties(properties), options);
}
