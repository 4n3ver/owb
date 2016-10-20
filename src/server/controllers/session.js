"use strict";

import uuid from "uuid";
import { createNameSpace } from "../ws";

const sessionMap = {};


export const join = sessionCode => ({
    sessionEndPoint: sessionMap[sessionCode]
});

export const create = () => {
    const systemSessionID = uuid.v4();
    const userSessionID = systemSessionID.substring(0, 8);
    sessionMap[userSessionID] = `/session/${systemSessionID}`;
    createNameSpace(sessionMap[userSessionID]);
    return {sessionID: userSessionID};
};

export default {
    create,
    join
};
