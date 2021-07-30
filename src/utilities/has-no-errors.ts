import {Properties, PropertyValidities} from "../validators/validator-type";
import {Condition} from "./condition";
import {hasError} from "./has-errors";

export function hasNoErrors<T>(properties?: Properties): Condition<T> {
    return (data: T, validities: PropertyValidities) => !hasError<T>(properties)(data, validities);
}
