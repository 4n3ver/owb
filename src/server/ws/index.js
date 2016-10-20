/* @flow */
"use strict";

import socketIO from "socket.io";

let io;

export const listen = server => {
    io = socketIO.listen(server);
};

const setupEventListener = nsp => {
    console.log(`New session created on ${nsp.name}`);
    nsp.on("connection", socket => {
        console.log(`${socket.id} connected to ${nsp.name}`);
        socket.once("disconnect", function () {
            socket.disconnect();    // make sure to close half-open connection
        });
    });
};

export const createNameSpace = name => setupEventListener(io.of(name));

const ws = {
    listen,
    createNameSpace
};

export default ws;
