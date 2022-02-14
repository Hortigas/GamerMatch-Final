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
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateRefreshToken = exports.checkRefreshTokenIsValid = exports.createRefreshToken = exports.addGames = exports.getGames = exports.setGames = exports.setUser = exports.getUsersById = exports.getUser = exports.updateProfile = exports.updateMessages = exports.getMatches = exports.setMatch = exports.tokens = exports.prisma = void 0;
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.tokens = new Map();
function setMatch(user_id_1, user_id_2) {
    return __awaiter(this, void 0, void 0, function* () {
        //cria match no bd
        try {
            return exports.prisma.public_match.create({
                data: {
                    user_id_1,
                    user_id_2,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.setMatch = setMatch;
function getMatches(req) {
    return __awaiter(this, void 0, void 0, function* () {
        //consulta match pelo user_id
        try {
            const matches = yield exports.prisma.public_match.findMany({
                where: {
                    OR: [
                        {
                            user_id_1: req,
                        },
                        {
                            user_id_2: req,
                        },
                    ],
                },
            });
            return matches;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
exports.getMatches = getMatches;
function updateMessages(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { match } = req;
            return exports.prisma.public_match.update({
                where: { id: match },
                data: {
                    messages: {
                        push: req,
                    },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.updateMessages = updateMessages;
function updateProfile(user_id, aboutMe, games, photo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const arrayGames = { user_id, games };
            yield addGames(arrayGames);
            return exports.prisma.public_user.update({
                where: { id: user_id },
                data: {
                    user_aboutme: aboutMe,
                    user_photo: photo,
                }
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.updateProfile = updateProfile;
function getUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        //consulta user pelo email
        try {
            const user = yield exports.prisma.public_user.findUnique({
                where: {
                    user_email: req,
                },
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.getUser = getUser;
function getUsersById(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield exports.prisma.public_user.findMany({
                where: {
                    id: {
                        in: req,
                    },
                },
            });
            return users.map((u) => {
                if (u.user_photo != null) {
                    const buff = Buffer.from(u.user_photo);
                    const user_avatar = buff.toString('base64').replace(/^dataimage\/pngbase64/, 'data:image/png;base64,');
                    return { userId: u.id, username: u.user_name, avatar: user_avatar };
                }
                else {
                    return { userId: u.id, username: u.user_name, avatar: '' };
                }
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.getUsersById = getUsersById;
function setUser(user_name, user_email, user_avatar, user_password, providerAuth = false) {
    return __awaiter(this, void 0, void 0, function* () {
        //cria user no bd
        const birth_date = null;
        try {
            return yield exports.prisma.public_user.create({
                data: {
                    user_name,
                    user_email,
                    user_password,
                    providerAuth,
                    birth_date,
                    user_photo: user_avatar,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.setUser = setUser;
function setGames(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //cria games no bd
        try {
            return exports.prisma.public_games.create({
                data: {
                    user_id,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.setGames = setGames;
function getGames(req) {
    return __awaiter(this, void 0, void 0, function* () {
        //retorna lista de games pelo user_id
        try {
            const games = yield exports.prisma.public_games.findFirst({
                where: {
                    user_id: req,
                },
            });
            return games;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
exports.getGames = getGames;
function addGames(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userID, jogo } = req;
            const user = yield exports.prisma.public_games.findMany({
                where: {
                    user_id: userID,
                },
            });
            return exports.prisma.public_games.update({
                where: { id: user[0].id },
                data: {
                    games: {
                        push: jogo,
                    },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.addGames = addGames;
function createRefreshToken(email) {
    var _a;
    const currentUserTokens = (_a = exports.tokens.get(email)) !== null && _a !== void 0 ? _a : [];
    const refreshToken = (0, uuid_1.v4)();
    exports.tokens.set(email, [...currentUserTokens, refreshToken]);
    return refreshToken;
}
exports.createRefreshToken = createRefreshToken;
function checkRefreshTokenIsValid(email, refreshToken) {
    var _a;
    const storedRefreshTokens = (_a = exports.tokens.get(email)) !== null && _a !== void 0 ? _a : [];
    return storedRefreshTokens.some((token) => token === refreshToken);
}
exports.checkRefreshTokenIsValid = checkRefreshTokenIsValid;
function invalidateRefreshToken(email, refreshToken) {
    var _a;
    const storedRefreshTokens = (_a = exports.tokens.get(email)) !== null && _a !== void 0 ? _a : [];
    exports.tokens.set(email, storedRefreshTokens.filter((token) => token !== refreshToken));
}
exports.invalidateRefreshToken = invalidateRefreshToken;
