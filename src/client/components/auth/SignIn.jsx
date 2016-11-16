/* @flow */
"use strict";

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Field, reduxForm } from "redux-form";
import FormInput from "../input/FormInput";
import { required } from "../../utils/form-validator";
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
                                disabled={!this.props.valid
                                || this.props.submitting}
                                className="ui fluid primary button">
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="ui inverted segment">
                        New to us?
                        <Link to="/signup">
                            {" Sign up"}
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
