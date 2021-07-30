import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isNumeric, {IsNumericOptions} from "validator/lib/isNumeric";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import { omit } from "lodash";

class IsNumeric<T> extends Validator<T> {
    readonly name: string = "is-numeric";
    readonly options?: ValidatorOptions<T> & IsNumericOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isNumeric(value, options);
    }
}

export function isNumeric<T>(properties: Properties, options?: ValidatorOptions<T> & IsNumericOptions): ValidatorInterface<T> {
    return new IsNumeric<T>(normalizeProperties(properties), options);
}
