import cors from 'cors';
import express, { application, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
import { generateJwtAndRefreshToken } from './auth';
import { auth } from './config';

import { checkRefreshTokenIsValid, invalidateRefreshToken, getUser, setUser, setMessage } from './database';
import { CreateSessionDTO, DecodedToken, CreateUser, GoogleProps, CreateMessage } from './types';
import { OAuth2Client } from 'google-auth-library';
import { timeStamp } from 'console';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();

app.use(express.json());
app.use(cors());

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
    const { user_email, user_password } = await getUser(email);

    if (!user_email || hash !== user_password) {
        return response.status(401).json({
            error: true,
            message: 'E-mail or password incorrect.',
        });
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(email);
    return response.json({
        token,
        refreshToken,
    });
});

app.post('/sessions/create', async (request, response) => {
    const { username, email, hash } = request.body as CreateUser;
    try {
        await setUser(username, email, hash);
        return response.json();
    } catch (error) {
        return response.status(409).json({
            error: true,
            message: 'This email address is already taken.',
        });
    }
});

/*app.post('/sessions/message', async (request, response) => {
    const { message, sender, receiver } = request.body as CreateMessage;
    try {
        await setMessage(message, sender, receiver);
        return response.json();
    } catch (error) {
        return response.status(409).json({
            error: true,
            message: 'Error - Message not send!',
        });
    }
});*/

app.post('/sessions/google', async (request, response) => {
    const { tokenId } = request.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email } = ticket.getPayload() as GoogleProps;

        const user = await getUser(email);
        if (!user) await setUser(name, email, '', true);
        const { token, refreshToken } = generateJwtAndRefreshToken(email);
        return response.json({
            token,
            refreshToken,
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

    const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email); /*, {
        permissions: user.permissions,
        roles: user.roles,
    });*/

    return response.json({
        token,
        refreshToken: newRefreshToken,
    });
});

app.get('/me', checkAuthMiddleware, async (request, response) => {
    const email = request.user;

    const { user_email } = await getUser(email);

    if (!user_email) {
        return response.status(400).json({ error: true, message: 'User not found.' });
    }

    return response.json({
        email,
        //permissions: user.permissions,
        //roles: user.roles,
    });
});

app.listen(3333);
