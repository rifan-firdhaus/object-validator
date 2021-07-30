import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isIn from "validator/lib/isIn";
import {Validator} from "./validator";
import {omit} from "lodash";
import {normalizeProperties} from "../object-validator";

type IsInOptions = { values: any[] }

class IsIn<T> extends Validator<T> {
    readonly name: string = "is-in";
    readonly options?: ValidatorOptions<T> & IsInOptions;

    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isIn(value, options.values);
    }
}

export function isIn<T>(properties: Properties, options?: ValidatorOptions<T> & IsInOptions | any[]): ValidatorInterface<T> {
    if (Array.isArray(options)) {
        options = {values: options};
    }

    return new IsIn<T>(normalizeProperties(properties), options);
}
