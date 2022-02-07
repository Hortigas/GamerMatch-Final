import { parseCookies } from 'nookies';
import React from 'react';
import io from 'socket.io-client';

let cookies = parseCookies();

export const socket = io('http://localhost:3455', {
    autoConnect: false,
    withCredentials: true,
    extraHeaders: {
        Authorization: `Bearer ${cookies['GamerMatch.token']}`,
    },
});
export const SocketContext = React.createContext(null);
