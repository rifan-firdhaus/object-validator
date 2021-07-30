import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isBtcAddress from "validator/lib/isBtcAddress";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsBtcAddress<T> extends Validator<T> {
    readonly name: string = "is-btc-address";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isBtcAddress(value);
    }
}

export function isBtcAddress<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsBtcAddress<T>(normalizeProperties(properties), options);
}
