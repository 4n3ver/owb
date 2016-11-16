/* @flow */
"use strict";

import React, { Component } from "react";
import { BarChart } from "react-d3-components";

class QuestionStatus extends Component {
    constructor(props) {
        super(props);
        this._bind("_makeBarGraph", "_renderOptions");
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    _renderOptions(opt, i) {
        return (
            <div key={i}>
                <strong>{`${String.fromCharCode(i + 65)}. `}</strong>{opt}
            </div>
        );
    }

    _makeBarGraph(data) {
        // convert into array of {label, value}
        const talliedData = Object.keys(data).reduce((prev, curr) => {
            // tallying
            if (!prev[data[curr]]) {
                prev[data[curr]] = 0;
            }
            prev[data[curr]]++;
            return prev;
        }, {});
        return [
            {
                values: Object.keys(talliedData).map((key) => ({
                    x: String.fromCharCode(parseInt(key) + 65),
                    y: talliedData[key]
                }))
            }
        ];
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui red label">
                    Polling Status
                </div>
                {this.props.question &&
                    <div>
                        <h3>{this.props.question.prompt}</h3>
                        {this.props.question.options.map(this._renderOptions)}
                    </div>
                }
                {this.props.responds &&
                <div>
                    <BarChart
                        data={this._makeBarGraph(this.props.responds)}
                        width={window.innerWidth * 0.4}
                        height={window.innerHeight * 0.2}
                        margin={{top: 30, bottom: 30, left: 30, right: 10}}
                    />
                </div>
                }
            </div>
        );
    }
}

QuestionStatus.propTypes = {
    responds: React.PropTypes.object,
    question: React.PropTypes.object
};

QuestionStatus.defaultProps = {
    responds: {}
};

export default QuestionStatus;
