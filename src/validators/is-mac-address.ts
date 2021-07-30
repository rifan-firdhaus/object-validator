import {Properties, rootValidatorOptionKeys, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isMACAddress, {IsMACAddressOptions} from "validator/lib/isMACAddress";
import {Validator} from "./validator";
import {omit} from "lodash";
import {normalizeProperties} from "../object-validator";

class IsMACAddress<T> extends Validator<T> {
    readonly name: string = "is-mac-address";
    readonly options?: ValidatorOptions<T> & IsMACAddressOptions;


    validate(value): boolean {
        const options = this.options || omit(this.options, rootValidatorOptionKeys);

        return _isMACAddress(value, options);
    }
}

export function isMACAddress<T>(properties: Properties, options?: ValidatorOptions<T> & IsMACAddressOptions): ValidatorInterface<T> {
    return new IsMACAddress<T>(normalizeProperties(properties), options);
}
