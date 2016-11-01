/* @flow */
"use strict";

import React, { Component } from "react";
import ws from "socket.io-client";
import { connect } from "react-redux";
import { API_URL } from "../../../config";

export default ComposedComponent => {
    class ConnectSession extends Component {
        constructor(props) {
            super(props);
            this._bind("_onConnected", "_onDisconnected");
            this.state = {
                connectionStatus: "disconnected"
            };
            this.socket = ws(`${API_URL}${this.props.sessionEndPoint}`);
        }

        _bind(...methods) {
            methods.forEach(
                method => this[method] = this[method].bind(this));
        }

        _onConnected() {
            this.setState({connectionStatus: "connected"});
        }

        _onDisconnected() {
            this.setState({connectionStatus: "disconnected"});
        }

        componentDidMount() {
            this.socket.on("connect", this._onConnected);
            this.socket.on("disconnect", this._onDisconnected);
        }

        render() {
            return (
                <div>
                    <div
                        className="ui fluid center aligned inverted segment">
                        <h3 className="ui header">
                            Session {localStorage.getItem("active-session-id")}
                        </h3>
                        <h5>
                            {this.state.connectionStatus === "connected"
                                ? <i className="green icon linkify"/>
                                : <i className="red icon unlinkify"/>}
                            {this.state.connectionStatus.toUpperCase()}
                        </h5>
                    </div>
                    <ComposedComponent {...this.props} socket={this.socket}/>
                </div>
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
