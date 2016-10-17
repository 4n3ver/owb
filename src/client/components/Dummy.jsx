/* @flow */
"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserData } from "../actions";

class Dummy extends Component {
    componentWillMount() {
        this.props.fetchUserData("/");
    }

    render() {
        return (
            <div className="ui segment">
                {this.props.userData && this.props.userData.message}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.auth.userData
});

const mapDispatchToProps = {
    fetchUserData
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dummy);
