/* @flow */
"use strict";

import React, { Component } from "react";
import Board from "../Board";
import connectSession from "../hoc/connectSession";
import AskQuestionForm from "../AskQuestionForm";
import QuestionStatus from "../QuestionStatus";

class Speaker extends Component {
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
        this.props.socket.on("question-responds", responds => {
            console.log(responds);
            this.setState({responds});
        });
        this.props.socket.on("question", question => {
            this.setState({question});
        });
    }

    render() {
        const socket = this.props.socket;
        return (
            <div>
                <Board height={500} width={500} allowDraw={true} onDraw={
                        d => socket.emit("board-drawn", JSON.stringify(d))}/>
                <AskQuestionForm
                    onAsk={d => socket.emit("question-asked", d)}/>
                <QuestionStatus responds={this.state.responds}
                    question={this.state.question}/>
            </div>
        );
    }
}

export default connectSession(Speaker);
