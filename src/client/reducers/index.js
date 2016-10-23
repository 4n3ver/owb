/* @flow */
"use strict";

import { combineReducers } from "redux";
import { reducer as formReducer} from "redux-form";

import sessionReducer from "./session";
import authReducer from "./auth";

const rootReducer = combineReducers(
    {
        form: formReducer,
        auth: authReducer,
        session: sessionReducer
    }
);

export default rootReducer;
