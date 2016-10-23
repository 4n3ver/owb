/* @flow */
"use strict";

import { API_URL } from "../../config";

export const get = (endpoint,
                    handler = () => null,
                    catcher = () => null) => dispatch =>
    fetch(`${API_URL}${endpoint}`, {
        method : "GET",
        headers: {"Authorization": localStorage.getItem("token")}
    })
        .then(response => response.json())
        .then(data => handler(dispatch, data))
        .catch(reason => catcher(dispatch, reason));

export const post = (endpoint, payload,
                     handler = () => null,
                     catcher = () => null) => dispatch =>
    fetch(`${API_URL}${endpoint}`, {
        method : "POST",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type" : "application/json"
        },
        body   : JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => handler(dispatch, data))
        .catch(reason => catcher(dispatch, reason));
