import cors from 'cors';
import express, { application, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
import { OAuth2Client } from 'google-auth-library';
import { Server } from 'socket.io';

import { generateJwtAndRefreshToken } from './auth';
import { auth } from './config';
<<<<<<< HEAD
import { checkRefreshTokenIsValid, invalidateRefreshToken, getUser, setUser, setMessage, getMessage } from './database';
import { CreateSessionDTO, DecodedToken, CreateUser, GoogleProps, Message, UserData } from './types';

=======

import { checkRefreshTokenIsValid, invalidateRefreshToken, getUser, setUser, setMessage, getMessage, setMatch } from './database';
import { CreateSessionDTO, DecodedToken, CreateUser, GoogleProps, Message, UserData, Matches } from './types';
import { OAuth2Client } from 'google-auth-library';
>>>>>>> 65209e8af4aadd99f75ca446d727e78a9149b724
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();
app.use(express.json());
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['authorization'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('chat.message', (data) => {
        console.log('[SOCKET] chat.message ', data);
        io.emit('chat.message', data);
    });
    socket.on('disconnect', () => {
        console.log('[SOCKET] chat.message disc');
    });
});
server.listen(3455, () => {
    console.log('listening on: port 3455');
});

function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }

    const [, token] = authorization?.split(' ');

    if (!token) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }

    try {
        const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

        request.user = decoded.sub;

        return next();
    } catch (err) {
        return response.status(401).json({ error: true, code: 'token.expired', message: 'Token invalid.' });
    }
}

function addUserInformationToRequest(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }

    const [, token] = authorization?.split(' ');

    if (!token) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }

    try {
        const decoded = decode(token as string) as DecodedToken;

        request.user = decoded.sub;

        return next();
    } catch (err) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Invalid token format.' });
    }
}

app.post('/sessions', async (request, response) => {
    const { email, hash } = request.body as CreateSessionDTO;
    const user = await getUser(email);

    if (user === null || hash !== user.user_password || user.providerAuth) {
        return response.status(401).json({
            error: true,
            message: 'E-mail or password incorrect.',
        });
    }

    const { user_email, user_password, user_name, id, providerAuth } = user;

    const { token, refreshToken } = generateJwtAndRefreshToken(email);
    return response.json({
        token,
        refreshToken,
        email: user_email,
        username: user_name,
        userId: id,
    });
});

app.post('/sessions/create', async (request, response) => {
    const { username, email, hash } = request.body as CreateUser;
    try {
        await setUser(username, email, hash);
        return response.json();
    } catch (error) {
        console.error(error);
        return response.status(409).json({
            error: true,
            message: 'This email address is already taken.',
        });
    }
});

app.post('/match', async (request, response) => {
    const { user_id_1, user_id_2} = request.body as Matches;
    try {
        await setMatch(user_id_1, user_id_2);
        return response.json();
    } catch (error) {
        return response.status(409).json({
            error: true,
            message: 'Error - Match not set!',
        });
    }
});

app.post('/message/send', async (request, response) => {
    const { message, sender, receiver, match } = request.body as Message;
    try {
        await setMessage(message, sender, receiver, match);
        return response.json();
    } catch (error) {
        return response.status(409).json({
            error: true,
            message: 'Error - Message not send!',
        });
    }
});

/*app.get('/message', checkAuthMiddleware, async (request, response) => {
    const email = request.user;
    const { id } = await getUser(email);



    if (!user_email) {
        return response.status(400).json({ error: true, message: 'User not found.' });
    }

    return response.json({
        email: user_email,
        username: user_name,
        userId: id,
    });
});*/

app.post('/sessions/google', async (request, response) => {
    const { tokenId } = request.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email } = ticket.getPayload() as GoogleProps;
        let user = await getUser(email);
        if (!user) user = (await setUser(name, email, '', true)) as UserData;
        const { token, refreshToken } = generateJwtAndRefreshToken(email);
        return response.json({
            token,
            refreshToken,
            email: user.user_email,
            username: user.user_name,
            userId: user.id,
        });
    } catch (err) {
        return response.status(401).json({
            error: true,
            message: err,
        });
    }
});

app.post('/refresh', addUserInformationToRequest, async (request, response) => {
    const email = request.user;
    const { refreshToken } = request.body;

    const { user_email } = await getUser(email);

    if (!user_email) {
        return response.status(401).json({
            error: true,
            message: 'User not found.',
        });
    }

    if (!refreshToken) {
        return response.status(401).json({ error: true, message: 'Refresh token is required.' });
    }

    const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken);

    if (!isValidRefreshToken) {
        return response.status(401).json({ error: true, message: 'Refresh token is invalid.' });
    }

    invalidateRefreshToken(email, refreshToken);

    const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email);
    return response.json({
        token,
        refreshToken: newRefreshToken,
    });
});

app.get('/me', checkAuthMiddleware, async (request, response) => {
    const email = request.user;

    const { user_email, user_name, id } = await getUser(email);

    if (!user_email) {
        return response.status(400).json({ error: true, message: 'User not found.' });
    }

    return response.json({
        email: user_email,
        username: user_name,
        userId: id,
    });
});

app.listen(3333);
