import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isFFQDN, {IsFQDNOptions} from "validator/lib/isFQDN";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";
import { omit } from "lodash";

class IsFQDN<T> extends Validator<T> {
    readonly name: string = "is-fqdn";
    readonly options?: ValidatorOptions<T> & IsFQDNOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isFFQDN(value, options);
    }
}

export function isFQDN<T>(properties: Properties, options?: ValidatorOptions<T> & IsFQDNOptions): ValidatorInterface<T> {
    return new IsFQDN<T>(normalizeProperties(properties), options);
}
