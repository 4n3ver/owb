/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "../Board";

class Audience extends Component {
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
            <div>
                Hello Audience!
                <Board height={500} width={500} allowDraw={false}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Audience);
