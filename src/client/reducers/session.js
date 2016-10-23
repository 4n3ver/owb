/* @flow */
"use strict";

import { JOIN_SESSION, CLOSE_SESSION, SESSION_ERROR } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case JOIN_SESSION:
            return Object.assign({}, state, {
                endPoint: action.payload.sessionEndPoint,
                error: ""
            });
        case CLOSE_SESSION:
            return Object.assign({}, state, {
                error: ""
            });
        case SESSION_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            });
        default:
            return state;
    }
};
