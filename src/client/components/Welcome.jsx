/* @flow */
"use strict";

import React, { Component } from "react";
import Board from "./Board";
import JoinSessionForm from "./JoinSessionForm";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this._bind();
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    render() {
        return (
            <JoinSessionForm/>
        );
    }
}

export default Welcome;
