/* @flow */
"use strict";

import React, { Component } from "react";
import Board from "../Board";
import connectSession from "../hoc/connectSession";

class Audience extends Component {
    constructor(props) {
        super(props);
        this._bind();
        this.state = {
            board: null
        };
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    componentDidMount() {
        this.props.socket.on("board-update", payload =>
            this.setState({board: payload}));
        console.log(this.props.stream);
    }

    render() {
        return (
            <div>
                <Board height={500} width={500} allowDraw={false}
                    boardState={this.state.board}/>
            </div>
        );
    }
}

export default connectSession(Audience);
