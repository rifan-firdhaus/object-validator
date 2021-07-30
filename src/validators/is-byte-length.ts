import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isByteLength, {IsByteLengthOptions} from "validator/lib/isByteLength";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import {omit} from "lodash";

class IsByteLength<T> extends Validator<T> {
    readonly name: string = "is-byte-length";
    readonly options?: ValidatorOptions<T> & IsByteLengthOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isByteLength(value, options);
    }
}

export function isByteLength<T>(properties: Properties, options?: ValidatorOptions<T> & IsByteLengthOptions): ValidatorInterface<T> {
    return new IsByteLength<T>(normalizeProperties(properties), options);
}
