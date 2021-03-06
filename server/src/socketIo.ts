import { Server } from 'socket.io';
import { addGames, updateMessages } from './database';
import { app } from './server';

const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:  process.env.SOCKET_ENDPOINT,
        methods: ['GET', 'POST'],
        allowedHeaders: ['authorization'],
        credentials: true,
    },
});

type User = {
    userId: number;
    socketId: string;
};
let users = [] as User[];
const addUser = (userId: number, socketId: string) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};
const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
};

export function socketIO() {
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);
        socket.emit('user.Id');
        socket.on('add.user', (userId) => {
            addUser(userId, socket.id);
            io.emit('get.users', users);
        });
        socket.on('chat.message', (data) => {
            const { toUserId } = data;
            const to = users.find((u) => u.userId === toUserId)?.socketId;
            if (!to) {
                try {
                    updateMessages(data);
                } catch (error) {
                    throw error;
                }
                console.error('NAO ENCONTRADO', users);
                return;
            } //tratar usuário offline
            socket.to(to).emit('chat.message', data);
            updateMessages(data);
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
/*
        const to = users.find((i)=>{i.userId == data.userId})?.socketId
        if(!to) {
            //tratar pessoa offine
            return}
        socket.to(to).emit("private message", {
            message_content: data.message_content,
            from: users.find((i)=>{i.userId == data.userId})?.socketId
*/
