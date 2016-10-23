/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import Board from "../Board";

class Speaker extends Component {
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
                Hello Speaker!
                <Board height={500} width={500} allowDraw={true}/>
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
)(Speaker);
