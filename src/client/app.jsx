/* @flow */
"use strict";

// tell webpack to copy static html and css to build folder
require.context("../../public/", true, /^\.\/.*\.(html|css|js)/);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./actions/types";
import requireAuth from "./components/hoc/requireAuth";
import requireActiveSession from "./components/hoc/requireActiveSession";
import reducers from "./reducers";
import App from "./components/App";
import GetStarted from "./components/GetStarted";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import SignUp from "./components/auth/SignUp";
import Audience from "./components/session/Audience";
import Speaker from "./components/session/Speaker";

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(reduxThunk),

        // TODO: make sure to remove this in production
        window.devToolsExtension
            ? window.devToolsExtension()
            : f => f
    )
);
const token = localStorage.getItem("token");

if (token) {
    // updating app state before anything is rendered
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={requireAuth(GetStarted)}/>
                <Route path="audience" component={compose(
                    requireActiveSession,
                    requireAuth
                )(Audience)}/>
                <Route path="speaker" component={compose(
                    requireActiveSession,
                    requireAuth
                )(Speaker)}/>
                <Route path="signout" component={requireAuth(SignOut)}/>
            </Route>
            <Route path="/">
                <Route path="signin" component={SignIn}/>
                <Route path="signup" component={SignUp}/>
            </Route>
        </Router>
    </Provider>,
    document.querySelector("#app")
);

