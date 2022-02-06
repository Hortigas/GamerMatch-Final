import { parseCookies } from 'nookies';
import io from 'socket.io-client';

let cookies = parseCookies();

export const socket = io('http://localhost:3455', {
    withCredentials: true,
    extraHeaders: {
        Authorization: `Bearer ${cookies['GamerMatch.token']}`,
    },
});
