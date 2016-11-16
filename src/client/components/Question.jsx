/* @flow */
"use strict";

import React, { Component } from "react";

class Question extends Component {
    constructor(props) {
        super(props);
        this._bind("_renderOptions", "_onOptionSelected");
        this.state = {
            selected: null
        };
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    _renderOptions(opt, i) {
        const buttonClass = `ui${i === this.state.selected
            ? " disabled"
            : ""} black button`;
        return (
            <button className={buttonClass} key={i}
                onClick={() => this._onOptionSelected(i)}>{opt}</button>
        );
    }

    _onOptionSelected(i) {
        this.setState({selected: i});
        this.props.onAnswer(i);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.question) {
            this.setState({selected: null});
        }
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui blue label">
                    Polling Question
                </div>
                {this.props.question &&
                <div>
                    <h3 className="ui header">
                        {this.props.question.prompt}
                    </h3>
                    {this.props.question.options.map(this._renderOptions)}
                </div>
                }
            </div>
        );
    }
}

Question.propTypes = {
    onAnswer: React.PropTypes.func.isRequired,
    question: React.PropTypes.object
};

Question.defaultProps = {};

export default Question;
