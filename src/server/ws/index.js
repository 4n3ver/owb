/* @flow */
"use strict";

import socketIO from "socket.io";

const setupEventListener = io => {
    io.sockets.on("connection", socket => {

    });
};

const listen = server => {
    const io = socketIO.listen(server);
    setupEventListener(io);
};

const ws = {
    listen
};

export default ws;
