import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isCreditCard from "validator/lib/isCreditCard";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsCreditCard<T> extends Validator<T> {
    readonly name: string = "is-credit-card";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isCreditCard(value);
    }
}

export function isCreditCard<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsCreditCard<T>(normalizeProperties(properties), options);
}
