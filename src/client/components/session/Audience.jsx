/* @flow */
"use strict";

import React, { Component } from "react";
import Board from "../Board";

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

    componentWillMount() {
        this.props.socket.on("board-update", payload =>
            this.setState({board: payload}));
    }

    render() {
        return (
            <div>
                Hello Audience!
                <Board height={500} width={500} allowDraw={false}
                    boardState={this.state.board}/>
            </div>
        );
    }
}

export default Audience;
