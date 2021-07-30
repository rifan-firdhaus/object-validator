import {PropertyValidities} from "../validators/validator-type";

export type Condition<T> = (data:T,validities:PropertyValidities) => boolean | Promise<boolean>;

export function condition<T>(...conditions: Condition<T>[]) {
    return conditions;
}
