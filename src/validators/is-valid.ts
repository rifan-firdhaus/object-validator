import {
    NormalizedProperties,
    Properties,
    ValidatorFunction,
    ValidatorInterface,
    ValidatorOptions
} from "./validator-type";
import {Validator} from "./validator";
import {normalizeProperties} from "../object-validator";

class IsValid<T> extends Validator<T> {
    public readonly name: string = "is-valid";

    constructor(
        readonly properties: NormalizedProperties,
        protected readonly validator: ValidatorFunction<T>,
        readonly options: ValidatorOptions<T>,
    ) {
        super(properties, options);
    }

    validate(value: any, data: T): Promise<boolean> | boolean {
        return this.validator(value, data);
    }
}


export function isValid<T>(properties: Properties, validator: ValidatorFunction<T>, options?: ValidatorOptions<T>): ValidatorInterface<T> {
    return new IsValid<T>(normalizeProperties(properties), validator, options);
}
