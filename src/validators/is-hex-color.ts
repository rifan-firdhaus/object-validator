import {Properties, ValidatorInterface, ValidatorOptions} from "./validator-type";
import _isHexColor from "validator/lib/isHexColor";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsHexColor<T> extends Validator<T> {
    readonly name: string = "is-hex-color";
    readonly options?: ValidatorOptions<T>;


    validate(value): boolean {
        return _isHexColor(value);
    }
}

export function isHexColor<T>(properties: Properties, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsHexColor<T>(normalizeProperties(properties), options);
}
