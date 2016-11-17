/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { signOutUser, closeSession } from "../../actions";

class SignOut extends Component {
    componentWillMount() {
        this.props.closeSession();
        this.props.signOutUser();
    }

    render() {
        return (
            <h1 className="ui header">Sorry to see you go...</h1>
        );
    }
}

const mapDispatchToProps = {
    signOutUser,
    closeSession
};

export default connect(
    null,
    mapDispatchToProps
)(SignOut);
