
/* @flow */
"use strict";

import React, { Component } from "react";

class FormInput extends Component {
    constructor(props) {
        super(props);
        this._bind();
    }

    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

    render() {
        const hasError = this.props.meta.touched && this.props.meta.error;
        return (
            <div
                className={`field${hasError
                    ? " error"
                    : ""}`}>
                <label>{this.props.label}</label>
                <div className={`ui input${this.props.children
                    ? " action"
                    : ""}`}>
                    <input
                        {...this.props.input}
                        {...this.props.attr}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                    />
                    {this.props.children}
                </div>
                {hasError &&
                <div className="ui error message">
                    {this.props.meta.error}
                </div>}
            </div>
        );
    }
}

FormInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    attr: React.PropTypes.object
};

FormInput.defaultProps = {};

export default FormInput;

export const required = (...fieldName) => (values, props, errors = {}) => {
    fieldName.forEach(name => !values[name]
        ? errors[name] = "Required!"
        : null
    );
    return errors;
};

export const pattern = (pattern, errorMessage, ...fieldName) =>
    (values, props, errors = {}) => {
        fieldName.forEach(name => values[name] && !pattern.test(values[name])
            ? errors[name] = `${name}: ${errorMessage}`
            : null
        );
        return errors;
    };
