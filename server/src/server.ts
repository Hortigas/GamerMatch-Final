import cors from 'cors';
import express, { application, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
import { OAuth2Client } from 'google-auth-library';

import { generateJwtAndRefreshToken } from './auth';
import { auth } from './config';
import { checkRefreshTokenIsValid, invalidateRefreshToken, getUser, setUser, setMatch, getMatches, getUsersById, updateProfile, getGames, setGames, addGames } from './database';
import { CreateSessionDTO, DecodedToken, CreateUser, GoogleProps, Message, UserData, Matches, Games } from './types';
import { socketIO } from './socketIo';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const app = express();
app.use(express.json());
app.use(cors());

socketIO();

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
        await setUser(username, email, '', hash);
        return response.json();
    } catch (error) {
        return response.status(409).json({
            error: true,
            message: 'This email address is already taken.',
        });
    }
});

app.post('/updateProfile', checkAuthMiddleware, async (request, response) => {
    const {user_id, aboutMe, games, photo } = request.body;
    try {
        updateProfile(user_id, aboutMe, games, photo );
    } catch (error) {
        throw error;
    }
});

app.get('/matches/:userId', checkAuthMiddleware, async (request, response) => {
    const userId = Number(request.params.userId);

    const matches = await getMatches(Number(userId)); //retorna conteudo da tabela match
    if (matches === null) {
        return response.status(401).json({
            error: true,
            message: 'userId not found',
        });
    }

    const usersId = matches.map((match) => {
        //retorna id dos usuários que dá match com o usuário atual
        if (match.user_id_1 === userId) {
            return match.user_id_2;
        } else if (match.user_id_2 === userId) {
            return match.user_id_1;
        }
    }) as number[];
    const users = await getUsersById(usersId);
    //console.log(users);
    const arrData = [] as any;
    matches.forEach((match) => {
        const user = users.find((user) => user.userId === match.user_id_1 || user.userId === match.user_id_2);
        const data = { matchId: match.id, messages: match.messages, userId: user?.userId, avatar: user?.avatar, username: user?.username };
        arrData.push(data);
    });
    return response.json(arrData);
});

app.post('/matches/create', checkAuthMiddleware, async (request, response) => {
    const { user_id_1, user_id_2 } = request.body as Matches;
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

app.post('/games/create', checkAuthMiddleware, async (request, response) => {
    const { user_id } = request.body as Games;
    try {
        await setGames(user_id);
        return response.json();
    } catch (error) {
        return response.status(409).json({
            error: true,
            message: 'Error - Games not set!',
        });
    }
});

app.get('/gameList/:userId', checkAuthMiddleware, async (request, response) => {
    const userId = Number(request.params.userId);

    const games = await getGames(Number(userId)); //retorna conteudo da tabela match
    if (games === null) {
        return response.status(401).json({
            error: true,
            message: 'userId not found',
        });
    }

    const data = { gameId: games.id, games: games.games, userId: games?.user_id };
    return response.json(data);
});

/*app.post('/message/send', checkAuthMiddleware, async (request, response) => {
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
});*/

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
        const teste = ticket.getPayload() as GoogleProps;
        console.log(teste);
        const { name, email, picture } = teste;
        let user = await getUser(email);
        if (!user) user = (await setUser(name, picture, email, '', true)) as UserData;
        const { token, refreshToken } = generateJwtAndRefreshToken(email);
        return response.json({
            token,
            refreshToken,
            email: user.user_email,
            username: user.user_name,
            avatar: user.user_avatar,
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

    const user = await getUser(email);

    console.log(user);

    if (!user.user_email) {
        return response.status(400).json({ error: true, message: 'User not found.' });
    }

    return response.json({
        userId: user.id,
        email: user.user_email,
        username: user.user_name,
        avatar: user.user_photo,
        birth: user.birth_date,
        aboutme: user.user_aboutme,
    });
});

app.listen(process.env.PORT || 3333);
