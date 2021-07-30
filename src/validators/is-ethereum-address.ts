import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isEthereumAddress from "validator/lib/isEthereumAddress";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsEthereumAddress<T> extends Validator<T> {
    readonly name: string = "is-ethereum-address";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isEthereumAddress(value);
    }
}

export function isEthereumAddress<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsEthereumAddress<T>(normalizeProperties(properties), options);
}
