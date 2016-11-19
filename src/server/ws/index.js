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

const onQuestionAsked = (data, all) => function (payload) {
    all.emit("question", payload);
    data.question = payload;
    data.responds = {};
};

const onQuestionAnswered = (data, all) => function (payload) {
    data.responds[this.id] = payload;
    all.emit("question-responds", data.responds);
};

const onWatson = (data, all) => function (payload) {
    data.watson += payload;
    all.emit("watson-said", payload);
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
        socket.on("question-asked", onQuestionAsked(data[nsp.name], nsp));
        socket.on("question-answered",
                  onQuestionAnswered(data[nsp.name], nsp));
        socket.on("watson", onWatson(data[nsp.name], nsp));

        socket.emit("welcome", data[nsp.name]);
    });
};

export const createNameSpace = name => setupEventListener(io.of(name));

const ws = {
    listen,
    createNameSpace
};

export default ws;
