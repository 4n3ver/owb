/* @flow */
"use strict";

import socketIO from "socket.io";

let io;
const data = {};

export const listen = server => {
    io = socketIO.listen(server);
};

const onBoardDrawn = (data, all) => function (payload) {
    all.emit("board-update", payload);
    data.board = payload;
};

const onDisconnect = socket => function () {
    socket.disconnect();    // make sure to close half-open connection
};

const setupEventListener = nsp => {
    console.log(`New session created on ${nsp.name}`);
    data[nsp.name] = {};
    nsp.on("connection", socket => {
        console.log(`${socket.id} connected to ${nsp.name}`);

        socket.once("disconnect", onDisconnect(socket));
        socket.on("board-drawn", onBoardDrawn(data[nsp.name], nsp));
        socket.emit("welcome", data[nsp.name]);
    });
};

export const createNameSpace = name => setupEventListener(io.of(name));

const ws = {
    listen,
    createNameSpace
};

export default ws;
