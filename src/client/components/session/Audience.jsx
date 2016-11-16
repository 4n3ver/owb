/* @flow */
"use strict";

import React, { Component } from "react";
import Board from "../Board";
import connectSession from "../hoc/connectSession";
import Question from "../Question";

class Audience extends Component {
    constructor(props) {
        super(props);
        this._bind();
        this.state = {
            question: null,
            responds: null,
            board   : null
        };
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    componentDidMount() {
        this.props.socket.on("welcome", () => {
        });
        this.props.socket.on("board-update", payload =>
            this.setState({board: payload}));
        this.props.socket.on("question", question => {
            this.setState({question});
        });
    }

    render() {
        const socket = this.props.socket;
        return (
            <div>
                <Board height={500} width={500} allowDraw={false}
                    boardState={this.state.board}/>
                <Question question={this.state.question}
                    onAnswer={d => socket.emit("question-answered", d)}/>
            </div>
        );
    }
}

export default connectSession(Audience);
