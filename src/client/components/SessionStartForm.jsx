/* @flow */
"use strict";

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import FormInput, { required, pattern } from "./input/FormInput";

class SessionStartForm extends Component {
    constructor(props) {
        super(props);
        this._bind("_onSubmit");
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    _onSubmit(payload) {

    }

    render() {
        const formClass = `ui error inverted form${this.props.processing
            ? " loading"
            : ""}`;
        return (
            <div className="ui middle aligned center aligned one column grid"
                style={{height: "100%"}}>
                <div className="little-box column">
                    <div
                        className="ui inverted center aligned segment">
                        <form
                            onSubmit={this.props.handleSubmit(this._onSubmit)}
                            className={formClass}>
                            <Field component={FormInput} name="session-id"
                                type="text" label="Join Session"
                                placeholder="type in the session id here...">
                                <button type="submit"
                                    disabled={!this.props.valid
                                    || this.props.submitting}
                                    className="ui compact small primary button">
                                    Join
                                </button>
                            </Field>
                        </form>
                        <div
                            className="ui horizontal inverted divider">
                            Or
                        </div>
                        <div className="ui mini primary button">
                            Start New Session
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const validateForm = (values, props) =>
    pattern(/[a-zA-Z0-9]{8}/, "Invalid Session ID", "session-id")(
        values,
        props,
        required("session-id")(values, props)
    );

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm(
        {
            form    : "session-start-form",
            validate: validateForm
        }
    )
)(SessionStartForm);
