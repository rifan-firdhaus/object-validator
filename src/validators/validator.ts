import {NormalizedProperties, ValidatorInterface, ValidatorOptions} from "./validator-type";

export abstract class Validator<T> implements ValidatorInterface<T> {
    readonly name: string;

    constructor(
        readonly properties: NormalizedProperties,
        readonly options?: ValidatorOptions<T>
    ) {
    }

    abstract validate(value: any, data: T): boolean | Promise<boolean>;

    defaultValidMessage(value: any, property: string, object: T, options: ValidatorOptions<T>):string {
        return this.name;
    }

    defaultInvalidMessage(value: any, property: string, object: T, options: ValidatorOptions<T>):string {
        return this.name;
    }

}
