/* @flow */
"use strict";

export const required = (...fieldName) => (values, props, errors = {}) => {
    fieldName.forEach(
        name => values[name] === void 0 || values[name].trim
        && values[name].trim().length === 0
            ? errors[name] = "Required!"
            : null
    );
    return errors;
};

export const pattern = (pattern, errorMessage, ...fieldName) =>
    (values, props, errors = {}) => {
        fieldName.forEach(
            name => values[name] && !pattern.test(values[name])
                ? errors[name] = `${name}: ${errorMessage}`
                : null
        );
        return errors;
    };

export default {
    required,
    pattern
};
