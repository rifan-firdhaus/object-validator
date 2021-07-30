import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isEmpty, {IsEmptyOptions} from "validator/lib/isEmpty";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsEmpty<T> extends Validator<T> {
    readonly name: string = "is-empty";
    readonly options?: ValidatorOptions<T> & IsEmptyOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isEmpty(value, options);
    }
}

export function isEmpty<T>(properties: Properties, options?: ValidatorOptions<T> & IsEmptyOptions): ValidatorInterface<T> {
    return new IsEmpty<T>(normalizeProperties(properties), options);
}
