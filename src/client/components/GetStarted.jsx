/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import JoinSessionForm from "./SessionStartForm";

class GetStarted extends Component {
    render() {
        return (
            <JoinSessionForm/>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.auth.userData
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetStarted);
