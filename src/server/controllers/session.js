"use strict";

import uuid from "uuid";
import { createNameSpace } from "../ws";

const sessionMap = {};

export const join = sessionCode => {
    if (sessionMap[sessionCode]) {
        return {
            sessionOwner   : sessionMap[sessionCode].owner,
            sessionEndPoint: sessionMap[sessionCode].endPoint
        };
    } else {
        return {
            error: "Session does not exists!"
        };
    }
};

/**
 *
 * @param owner
 * @returns {{sessionID: string, sessionEndPoint: string}} new session if
 * the owner has no current active session, the active session otherwise
 */
export const create = owner => {
    let session = sessionMap[Object.keys(sessionMap)
                                   .find(
                                       id => sessionMap[id].owner === owner)];
    if (!session) {
        console.log(`Session with owner ${owner} not found...`);
        const systemSessionID = uuid.v4();
        const userSessionID = systemSessionID.substring(0, 8);
        sessionMap[userSessionID] = {
            id      : userSessionID,
            endPoint: `/session/${systemSessionID}`,
            owner
        };
        session = sessionMap[userSessionID];
        createNameSpace(session.endPoint);
    }
    console.log(session);
    return {
        sessionID      : session.id,
        sessionEndPoint: session.endPoint,
        sessionOwner   : session.owner
    };
};

export const close = owner => {
    const session = sessionMap[
        Object.keys(sessionMap).find(id => sessionMap[id].owner === owner)];
    if (session) {
        console.log(`Session ${session.id} closed`);
        delete sessionMap[session.id];
        return {error: false};
    } else {
        console.log(`Closing session ${session.id} failed`);
        return {error: true};
    }
};

export default {
    create,
    join,
    close
};
