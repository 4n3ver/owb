/* @flow */
"use strict";

import { browserHistory } from "react-router";
import { CLOSE_SESSION, SESSION_ERROR, JOIN_SESSION } from "./types";
import { post } from "../utils/auth";

export const showSessionError = err => ({
    type   : SESSION_ERROR,
    payload: err
});

export const createSession = () =>
    post(
        "/session/create",
        {requester: localStorage.getItem("email")},
        (dispatch, data) => {
            if (data.sessionID) {
                dispatch(
                    {
                        type   : JOIN_SESSION,
                        payload: {sessionEndPoint: data.sessionEndPoint}
                    }
                );
                localStorage.setItem("active-session-id", data.sessionID);
                browserHistory.push("/speaker");
            } else {
                dispatch(showSessionError(data.error));
            }
        },
        (dispatch, reason) => {
            console.log(reason);
            dispatch(showSessionError(reason));
        }
    );

export const joinSession = sessionID =>
    post(
        "/session/join",
        {sessionID},
        (dispatch, data) => {
            if (data.sessionEndPoint) {
                dispatch(
                    {
                        type   : JOIN_SESSION,
                        payload: {sessionEndPoint: data.sessionEndPoint}
                    }
                );
                localStorage.setItem("active-session-id", sessionID);
                if (data.sessionOwner === localStorage.getItem("email")) {
                    browserHistory.push("/speaker");
                } else {
                    browserHistory.push("/audience");
                }
            } else {
                dispatch(showSessionError(data.error));
            }
        },
        (dispatch, reason) => {
            console.error("AUTH_POST", reason);
            dispatch(showSessionError("Session does not exists"));
        }
    );

export const closeSession = () => ({
    type: CLOSE_SESSION
});

export default {
    createSession,
    joinSession,
    closeSession,
    showSessionError
};
