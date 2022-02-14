"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const google_auth_library_1 = require("google-auth-library");
const auth_1 = require("./auth");
const config_1 = require("./config");
const database_1 = require("./database");
const socketIo_1 = require("./socketIo");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
(0, socketIo_1.socketIO)();
function checkAuthMiddleware(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }
    const [, token] = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ');
    if (!token) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.auth.secret);
        request.user = decoded.sub;
        return next();
    }
    catch (err) {
        return response.status(401).json({ error: true, code: 'token.expired', message: 'Token invalid.' });
    }
}
function addUserInformationToRequest(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }
    const [, token] = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ');
    if (!token) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Token not present.' });
    }
    try {
        const decoded = (0, jwt_decode_1.default)(token);
        request.user = decoded.sub;
        return next();
    }
    catch (err) {
        return response.status(401).json({ error: true, code: 'token.invalid', message: 'Invalid token format.' });
    }
}
exports.app.post('/sessions', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, hash } = request.body;
    const user = yield (0, database_1.getUser)(email);
    if (user === null || hash !== user.user_password || user.providerAuth) {
        return response.status(401).json({
            error: true,
            message: 'E-mail or password incorrect.',
        });
    }
    const { user_email, user_password, user_name, id, providerAuth } = user;
    const { token, refreshToken } = (0, auth_1.generateJwtAndRefreshToken)(email);
    return response.json({
        token,
        refreshToken,
        email: user_email,
        username: user_name,
        userId: id,
    });
}));
exports.app.post('/sessions/create', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, hash } = request.body;
    try {
        yield (0, database_1.setUser)(username, email, '', hash);
        return response.json();
    }
    catch (error) {
        return response.status(409).json({
            error: true,
            message: 'This email address is already taken.',
        });
    }
}));
exports.app.post('/updateProfile', checkAuthMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, aboutMe, games, photo } = request.body;
    try {
        (0, database_1.updateProfile)(user_id, aboutMe, games, photo);
    }
    catch (error) {
        throw error;
    }
}));
exports.app.get('/matches/:userId', checkAuthMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(request.params.userId);
    const matches = yield (0, database_1.getMatches)(Number(userId)); //retorna conteudo da tabela match
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
        }
        else if (match.user_id_2 === userId) {
            return match.user_id_1;
        }
    });
    const users = yield (0, database_1.getUsersById)(usersId);
    //console.log(users);
    const arrData = [];
    matches.forEach((match) => {
        const user = users.find((user) => user.userId === match.user_id_1 || user.userId === match.user_id_2);
        const data = { matchId: match.id, messages: match.messages, userId: user === null || user === void 0 ? void 0 : user.userId, avatar: user === null || user === void 0 ? void 0 : user.avatar, username: user === null || user === void 0 ? void 0 : user.username };
        arrData.push(data);
    });
    return response.json(arrData);
}));
exports.app.post('/matches/create', checkAuthMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id_1, user_id_2 } = request.body;
    try {
        yield (0, database_1.setMatch)(user_id_1, user_id_2);
        return response.json();
    }
    catch (error) {
        return response.status(409).json({
            error: true,
            message: 'Error - Match not set!',
        });
    }
}));
exports.app.post('/games/create', checkAuthMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = request.body;
    try {
        yield (0, database_1.setGames)(user_id);
        return response.json();
    }
    catch (error) {
        return response.status(409).json({
            error: true,
            message: 'Error - Games not set!',
        });
    }
}));
exports.app.get('/gameList/:userId', checkAuthMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(request.params.userId);
    const games = yield (0, database_1.getGames)(Number(userId)); //retorna conteudo da tabela match
    if (games === null) {
        return response.status(401).json({
            error: true,
            message: 'userId not found',
        });
    }
    const data = { gameId: games.id, games: games.games, userId: games === null || games === void 0 ? void 0 : games.user_id };
    return response.json(data);
}));
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
exports.app.post('/sessions/google', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = request.body;
    try {
        const ticket = yield client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const teste = ticket.getPayload();
        console.log(teste);
        const { name, email, picture } = teste;
        let user = yield (0, database_1.getUser)(email);
        if (!user)
            user = (yield (0, database_1.setUser)(name, picture, email, '', true));
        const { token, refreshToken } = (0, auth_1.generateJwtAndRefreshToken)(email);
        return response.json({
            token,
            refreshToken,
            email: user.user_email,
            username: user.user_name,
            avatar: user.user_photo,
            userId: user.id,
        });
    }
    catch (err) {
        return response.status(401).json({
            error: true,
            message: err,
        });
    }
}));
exports.app.post('/refresh', addUserInformationToRequest, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.user;
    const { refreshToken } = request.body;
    const { user_email } = yield (0, database_1.getUser)(email);
    if (!user_email) {
        return response.status(401).json({
            error: true,
            message: 'User not found.',
        });
    }
    if (!refreshToken) {
        return response.status(401).json({ error: true, message: 'Refresh token is required.' });
    }
    const isValidRefreshToken = (0, database_1.checkRefreshTokenIsValid)(email, refreshToken);
    if (!isValidRefreshToken) {
        return response.status(401).json({ error: true, message: 'Refresh token is invalid.' });
    }
    (0, database_1.invalidateRefreshToken)(email, refreshToken);
    const { token, refreshToken: newRefreshToken } = (0, auth_1.generateJwtAndRefreshToken)(email);
    return response.json({
        token,
        refreshToken: newRefreshToken,
    });
}));
exports.app.get('/me', checkAuthMiddleware, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.user;
    const user = yield (0, database_1.getUser)(email);
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
}));
exports.app.listen(process.env.PORT || 3333);
