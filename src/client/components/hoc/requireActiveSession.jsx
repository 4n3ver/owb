/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

export default ComposedComponent => {
    class Session extends Component {
        componentWillMount() {
            if (!this.props.sessionEndPoint) {
                this.context.router.push("/");
            }
        }

        componentWillUpdate(nextProps) {}

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Session.contextTypes = {
        router: React.PropTypes.object
    };

    const mapStateToProps = state => ({
        sessionEndPoint: state.session.endPoint
    });

    return connect(
        mapStateToProps
    )(Session);
};
