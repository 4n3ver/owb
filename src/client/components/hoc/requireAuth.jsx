/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

export default ComposedComponent => {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.context.router.push("/");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.push("/");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authentication.contextTypes = {
        router: React.PropTypes.object
    };

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.authenticated
    });

    return connect(
        mapStateToProps
    )(Authentication);
};
