/* @flow */
"use strict";

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import FormInput from "./input/FormInput";
import { required } from "../utils/form-validator";

class AskQuestionForm extends Component {
    constructor(props) {
        super(props);
        this._bind("_onSubmit", "_renderAlert", "_renderMultipleChoiceFields",
                   "_addOption", "_removeOption");
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    _addOption() {
        this.props.array.push("options", "");
    }

    _removeOption(i) {
        if (this.props.formState.values.options.length > 2) {
            this.props.array.remove("options", i);
        }
    }

    _renderMultipleChoiceFields(d, i) {
        return (
            <div key={i}>
                <Field
                    component={FormInput}
                    name={`options[${i}]`}
                    type="text"
                    placeholder="type in the option here...">
                    <div className="ui compact red icon button"
                        data-tooltip="Remove this option"
                        data-position="top right"
                        onClick={() => this._removeOption(i)}>
                        <i className="remove icon"/>
                    </div>
                </Field>
            </div>
        );
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

    _onSubmit(payload) {
        this.props.onAsk(payload);
        this.props.reset();
        this._addOption();
        this._addOption();
    }

    componentDidMount() {
        const options = this.props.formState
            && this.props.formState.values.options;
        if (!options || options.length < 2) {
            this._addOption();
            this._addOption();
        }
    }

    render() {
        const formClass = `ui error form${this.props.processing
            ? " loading"
            : ""}`;
        const options = this.props.formState && this.props.formState.values
            && this.props.formState.values.options;
        return (
            <form
                onSubmit={this.props.handleSubmit(this._onSubmit)}
                className={formClass}>
                <div className="ui segments">
                    <div className="ui segment">
                        <div className="ui blue label">
                            Start Polling
                        </div>
                        <Field component={FormInput} name="prompt"
                            type="text"
                            label="Question"
                            placeholder="type in the question prompt here..."/>
                        <div><strong>Options</strong></div>
                        {options && options.map(
                            this._renderMultipleChoiceFields)}
                        <div style={{marginTop: "5px"}}
                            className="ui mini fluid circular blue button"
                            onClick={this._addOption}>
                            Add more options
                        </div>
                        {this._renderAlert()}
                    </div>
                    <div className="ui compact segment">
                        <button type="submit"
                            disabled={this.props.invalid
                                    || this.props.submitting}
                            className="ui small primary button">
                            Ask Question
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

AskQuestionForm.propTypes = {
    onAsk: React.PropTypes.func.isRequired
};

AskQuestionForm.defaultProps = {};

const mapStateToProps = state => ({
    formState: state.form["ask-question-form"]
});

const mapDispatchToProps = {};

const validateForm = (values, props, errors = {}) => {
    const options = values.options || new Array(2).fill("");
    errors.options = options.map(
        v => v === void 0 || v.trim && v.trim().length === 0
            ? "Required!"
            : null);
    return required("options", "prompt")(values, props, errors);
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm(
        {
            form    : "ask-question-form",
            validate: validateForm
        }
    )
)(AskQuestionForm);
