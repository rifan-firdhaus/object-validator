import {get, set } from "lodash";
import {
    AllValidationMessages,
    NormalizedProperties,
    Properties,
    PropertyValidities,
    ValidationMessages,
    ValidatorInterface,
    ValidatorMessageFunction
} from "./validators/validator-type";

export type ValidatorInterfaces<T> = ValidatorInterface<T>[];

export class ObjectValidator<T> {
    protected _data: T;
    protected _rules: ValidatorInterfaces<T> = [];
    protected _safeProperties: NormalizedProperties = [];
    protected _validities: PropertyValidities = {};
    protected _isValid: boolean = true;
    protected _validMessages: ValidationMessages;
    protected _invalidMessages: ValidationMessages;

    constructor(
        rules: ValidatorInterfaces<T>
    ) {
        this.rules = rules;
    }

    get data(): T {
        return this._data;
    };

    get rules(): ValidatorInterfaces<T> {
        return this._rules;
    };

    set rules(rules: ValidatorInterfaces<T>) {
        const safeProperties: NormalizedProperties = [];

        rules.forEach(
            rule => rule.properties.forEach(
                property => safeProperties.indexOf(property) === -1 && safeProperties.push(property)
            )
        );

        this._rules = rules;
        this._safeProperties = safeProperties;
    }

    get safeProperties(): NormalizedProperties {
        return this._safeProperties;
    }

    get validities(): PropertyValidities {
        return this._validities;
    }

    get isValid(): boolean {
        return this._isValid;
    }

    get isInvalid(): boolean {
        return !this._isValid;
    }

    get validMessages(): ValidationMessages {
        return this._validMessages;
    }

    get invalidMessages(): ValidationMessages {
        return this._invalidMessages;
    }

    get messages(): AllValidationMessages {
        return {
            valid: this.validMessages,
            invalid: this.invalidMessages
        }
    }

    values(): Partial<T> {
        const result = {};

        this.safeProperties.forEach(property => {
            set(result, property, this.getPropertyValue(property));
        });

        return result;
    }

    async validate(data: T): Promise<boolean> {
        this._data = data;
        this._isValid = true;
        this._validMessages = {};
        this._invalidMessages = {};
        this._validities = {};

        this.safeProperties.forEach(property => {
            this._validities[property] = true;
            this._invalidMessages[property] = [];
            this._validMessages[property] = [];
        });

        for (let rule of this.rules) {
            if (!await this.isValidatorProcessable(rule)) {
                continue;
            }

            const ruleValidities = await this.processValidator(rule);

            for (let property in ruleValidities) {
                const isValid = ruleValidities[property];
                const message = this.getValidatorMessage(isValid, property, rule);

                if (!isValid) {
                    this.validities[property] = isValid;
                    this.invalidMessages[property].push(message);
                } else {
                    this.validMessages[property].push(message);
                }
            }
        }

        return this.isValid;
    }

    protected getPropertyValue(property: string): any {
        return get(this.data, property);
    }

    protected async processValidator(rule: ValidatorInterface<T>): Promise<PropertyValidities> {
        const validities: PropertyValidities = {};
        let properties = rule.properties.filter(property => this.safeProperties.indexOf(property) > -1);

        for (let property of properties) {
            let isValid = rule.validate(this.getPropertyValue(property), this.data);

            if (isValid instanceof Promise) isValid = await isValid;

            validities[property] = isValid;
        }

        return validities;
    }

    protected async isValidatorProcessable(rule: ValidatorInterface<T>): Promise<boolean> {
        if (!rule.options) {
            return true;
        }

        const conditions = rule.options.if;

        if (typeof conditions === 'boolean' || conditions instanceof Promise) {
            return conditions;
        } else if (conditions instanceof Function) {
            return conditions(this.data, this._validities);
        } else if (Array.isArray(conditions)) {
            for (let condition of conditions) {
                let result = condition(this.data, this._validities);

                if (result instanceof Promise) result = await result;

                if (!result) {
                    return false;
                }
            }
        }

        return true;
    }

    protected getValidatorMessage(isValid: boolean, property: string, rule: ValidatorInterface<T>): string {
        let message = "";
        const value = this.getPropertyValue(property);
        const messageProperty = isValid ? 'validMessage' : "invalidMessage";
        const defaultMessageProperty = isValid ? 'defaultValidMessage' : "defaultInvalidMessage";

        if (rule.options && rule.options[messageProperty]) {
            if (typeof rule.options[messageProperty] === 'string') {
                message = rule.options[messageProperty] as string;
            } else {
                message = (<ValidatorMessageFunction<T>>rule.options[messageProperty])(value, property, this.data, rule.options)
            }
        } else if (rule[defaultMessageProperty]) {
            message = rule[defaultMessageProperty](value, property, this.data, rule.options)
        }

        return message;
    }
}

export function normalizeProperties(properties: Properties): NormalizedProperties {
    return typeof properties === 'string' ? [properties] : properties
}
