"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIO = void 0;
const socket_io_1 = require("socket.io");
const database_1 = require("./database");
const server_1 = require("./server");
const http = require('http');
const server = http.createServer(server_1.app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.SOCKET_ENDPOINT,
        methods: ['GET', 'POST'],
        allowedHeaders: ['authorization'],
        credentials: true,
    },
});
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
function socketIO() {
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);
        socket.emit('user.Id');
        socket.on('add.user', (userId) => {
            addUser(userId, socket.id);
            io.emit('get.users', users);
        });
        socket.on('chat.message', (data) => {
            var _a;
            const { toUserId } = data;
            const to = (_a = users.find((u) => u.userId === toUserId)) === null || _a === void 0 ? void 0 : _a.socketId;
            if (!to) {
                try {
                    (0, database_1.updateMessages)(data);
                }
                catch (error) {
                    throw error;
                }
                console.error('NAO ENCONTRADO', users);
                return;
            } //tratar usuário offline
            socket.to(to).emit('chat.message', data);
            (0, database_1.updateMessages)(data);
            //const af = 5942175
            //const jogo = { gameName: "GTA V", timePlayed:10425, gameCategory:"Mundo Aberto"};
            //const teste = {userID:af, jogo};
            //addGames(teste);
        });
        socket.on('disconnect', () => {
            console.log('user disconnect', socket.id);
            removeUser(socket.id);
            io.emit('get.users', users);
        });
    });
    server.listen(3455);
}
exports.socketIO = socketIO;
/*
        const to = users.find((i)=>{i.userId == data.userId})?.socketId
        if(!to) {
            //tratar pessoa offine
            return}
        socket.to(to).emit("private message", {
            message_content: data.message_content,
            from: users.find((i)=>{i.userId == data.userId})?.socketId
*/
