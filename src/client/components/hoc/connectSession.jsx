/* @flow */
"use strict";

import React, { Component } from "react";
import ws from "socket.io-client";
import { connect } from "react-redux";
import rtc from "rtc-quickconnect";
import attach from "rtc-attach";
import { API_URL } from "../../../config";

export default ComposedComponent => {
    class ConnectSession extends Component {
        constructor(props) {
            super(props);
            console.log(
                `CONNECT_SESSION: ${API_URL}${this.props.sessionEndPoint}`);
            this._bind("_onConnected", "_onDisconnected", "_setupVoiceRTC");
            this.state = {connectionStatus: "disconnected"};
            this.socket = ws(`${API_URL}${this.props.sessionEndPoint}`);
            this.stream = navigator.mediaDevices.getUserMedia({audio: true});
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

        _setupVoiceRTC(audioContainer) {
            if (this.rtc) {
                return;
            }
            this.stream
                .then(
                    localStream => {
                        // initiate connection
                        this.rtc = rtc("https://switchboard.rtc.io/", {
                            room : this.props.sessionEndPoint,
                            debug: false
                        });

                        this.localStream = localStream;

                        // broadcast our captured media to other
                        // participants in the room
                        this.rtc.addStream(localStream)

                            // when a peer is connected (and active) pass it
                            // to us for use
                            .on("call:started",
                                (id, pc, data) => {
                                    if (this.props.route.path
                                        === "audience") {
                                        attach(
                                            pc.getRemoteStreams()[0],
                                            {el: audioContainer},
                                            (err, el) => {
                                                // TODO: what to do here?
                                                //console.log(err, el);
                                            }
                                        );
                                    }
                                    console.log("STARTED", id);
                                })

                            // when a peer leaves
                            .on("call:ended", function (id) {
                                // TODO: need to terminate the stream
                                console.log("ENDED", id);
                            });
                    })
                .catch(err => console.error("ConnectSession", err));
        }

        componentDidMount() {
            this.socket.on("connect", this._onConnected);
            this.socket.on("disconnect", this._onDisconnected);
        }

        componentWillUnmount() {
            if (this.rtc) {
                if (this.localStream) {
                    this.rtc.removeStream(this.localStream);
                }
                this.rtc.close();
            }
            if (this.socket) {
                this.socket.disconnect();
            }
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
                    <audio ref={this._setupVoiceRTC}/>
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
