/* @flow */
"use strict";

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_USER_DATA
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case AUTH_USER:
            return Object.assign({}, state, {
                authenticated: true,
                error        : ""
            });
        case UNAUTH_USER:
            return Object.assign({}, state, {
                authenticated: false,
                error        : ""
            });
        case AUTH_ERROR:
            return Object.assign({}, state, {error: action.payload});
        case FETCH_USER_DATA:
            return Object.assign({}, state, {userData: action.payload});
        default:
            return state;
    }
};
