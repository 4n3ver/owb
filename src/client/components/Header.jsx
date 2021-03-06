/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Header extends Component {
    _authLink() {
        if (this.props.isAuthenticated) {
            return (
                <span className="item">
                    <Link to="/signout">
                        Sign out
                    </Link>
                </span>
            );
        } else {
            return [
                <span className="item" key={1}>
                    <Link to="/signin">
                        Sign in
                    </Link>
                </span>,
                <span className="item" key={2}>
                    <Link to="/signup">
                        Sign up
                    </Link>
                </span>
            ];
        }
    }

    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="right menu">
                    {this._authLink()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.authenticated
});

export default connect(
    mapStateToProps
)(Header);
