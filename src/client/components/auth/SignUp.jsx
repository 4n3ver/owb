/* @flow */
"use strict";

import { compose } from "redux";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Field, reduxForm } from "redux-form";
import FormInput from "../input/FormInput";
import { required } from "../../utils/form-validator";
import { signUpUser, showAuthError } from "../../actions";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this._bind("_onSubmit");
    }

    componentWillMount() {
        this.props.showAuthError("");  // remove any error before first render
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    _onSubmit({email, password}) {
        // assume password and confirm password are the same
        this.props.signUpUser(email, password);
    }

    _renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="ui error message">
                    <div className="header">Oops!</div>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="ui middle aligned center aligned one column grid"
                style={{height: "100%"}}>
                <div className="little-box column">
            <div className="ui inverted segment">
                <form
                    onSubmit={this.props.handleSubmit(this._onSubmit)}
                    className="ui inverted form error">
                    <Field
                        component={FormInput}
                        name="email"
                        label="e-Mail"
                        type="email"
                        placeholder="test@example.com"
                    />
                    <Field
                        component={FormInput}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="********"
                    />
                    <Field
                        component={FormInput}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="********"
                    />
                    {this._renderAlert()}
                    <button type="submit"
                        disabled={!this.props.valid || this.props.submitting}
                        className="ui fluid primary button">
                        Sign Up
                    </button>
                </form>
            </div>
                    <div className="ui inverted segment">
                        Already have an account?
                        <Link to="/signin">
                            {" Sign in"}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.auth.error
});

const mapDispatchToProps = {
    signUpUser,
    showAuthError
};

// TODO: refactor this some other time
const validateForm = (values, props) => {
    const errors = required("email", "password", "confirmPassword")(values, props);
    if (values.password && values.password.length < 6) {
        errors.password = "Password has to be greater than 6 characters!";
    }
    if (values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password do not match!";
    }
    return errors;
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm(
        {
            form    : "signup", // unique identifier for this form
            validate: validateForm    // pass validation function to redux-form
        }
    )
)(SignUp);
