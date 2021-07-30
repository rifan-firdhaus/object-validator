import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isPort from "validator/lib/isPort";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsPort<T> extends Validator<T> {
    readonly name: string = "is-port";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isPort(value);
    }
}

export function isPort<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsPort<T>(normalizeProperties(properties), options);
}
