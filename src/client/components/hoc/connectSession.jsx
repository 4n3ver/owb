/* @flow */
"use strict";

import React, { Component } from "react";
import ws from "socket.io-client";
import { connect } from "react-redux";

import {API_URL} from "../../../config";

export default ComposedComponent => {
    class ConnectSession extends Component {
        constructor(props) {
            super(props);
            this._bind();
        }

        _bind(...methods) {
            methods.forEach(
                method => this[method] = this[method].bind(this));
        }

        componentWillMount() {
            this.socket = ws(`${API_URL}${this.props.sessionEndPoint}`);
            this.socket.on("connect", () => {});
        }

        render() {
            return (
                <ComposedComponent {...this.props} socket={this.socket} />
            );
        }
    }

    const mapStateToProps = state => ({
        sessionEndPoint: state.session.endPoint
    });

    const mapDispatchToProps = {};

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ConnectSession);
};
