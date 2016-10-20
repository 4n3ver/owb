/* @flow */
"use strict";

import React, { Component } from "react";
import Header from "./Header";

export default class App extends Component {
    render() {
        return (
            <div style={{height: "100%"}} >
                <Header/>
                <div style={{height: "100%"}} className="ui container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
