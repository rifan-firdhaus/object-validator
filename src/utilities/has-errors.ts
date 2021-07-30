import {pick} from "lodash";
import {Properties, PropertyValidities} from "../validators/validator-type";
import {Condition} from "./condition";

export function hasError<T>(properties?: Properties): Condition<T> {
    return (data: T, validities: PropertyValidities) => {
        if (properties) (validities = pick(validities, properties));

        return Object.values(validities).indexOf(false) > -1
    }
}
