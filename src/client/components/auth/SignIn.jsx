/* @flow */
"use strict";

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import FormInput, { required } from "../input/FormInput";
import { signInUser, showAuthError } from "../../actions";

class SignIn extends Component {
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
        this.props.signInUser(email, password);
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
            <div className="ui segment">
                <form
                    onSubmit={this.props.handleSubmit(this._onSubmit)}
                    className="ui form error">
                    <Field
                        component={FormInput}
                        name="email"
                        type="email"
                        label="e-Mail"
                        placeholder="test@example.com"/>
                    <Field
                        component={FormInput}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="********"/>
                    {this._renderAlert()}
                    <button type="submit"
                        disabled={!this.props.valid || this.props.submitting}
                        className="ui fluid primary button">
                        Sign In
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.auth.error
});

const mapDispatchToProps = {
    signInUser,
    showAuthError
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm(
        {
            form    : "signin",
            validate: required("email", "password")
        }
    )
)(SignIn);
