import { RefreshTokensStore } from './types';
import { v4 as uuid } from 'uuid';
import { UserData } from './types';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const tokens: RefreshTokensStore = new Map();

export async function setMatch(user_id_1: number, user_id_2: number) {
    //cria match no bd
    try {
        return prisma.public_match.create({
            data: {
                user_id_1,
                user_id_2,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getMatches(req: number) {
    //consulta match pelo user_id
    try {
        const matches = await prisma.public_match.findMany({
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
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateMessages(req: any) {
    try {
        const { match } = req;
        return prisma.public_match.update({
            where: { id: match },
            data: {
                messages: {
                    push: req,
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateProfile(user_id: number, aboutMe: string, games: any, photo: string) {
    try {
        const base64Response = await Buffer.from(photo, 'base64'); //string to bytea
        const arrayGames = {user_id, games};
        await addGames(arrayGames);
        return prisma.public_user.update({
            where: { id: user_id },
            data: {
                perfil_aboutme: aboutMe,                
                perfil_photo: base64Response,
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUser(req: string) {
    //consulta user pelo email
    try {
        const user = await prisma.public_user.findUnique({
            where: {
                user_email: req,
            },
        });
        return user as UserData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUsersById(req: number[]) {
    try {
        const users = await prisma.public_user.findMany({
            where: {
                id: {
                    in: req,
                },
            },
        });
        return users.map((u) => {
            if (u.perfil_photo != null) {
                const buff = Buffer.from(u.perfil_photo);
                const user_avatar = buff.toString('base64').replace(/^dataimage\/pngbase64/, 'data:image/png;base64,');
                return { userId: u.id, username: u.user_name, avatar: user_avatar };
            } else {
                return { userId: u.id, username: u.user_name, avatar: '' };
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setUser(user_name: string, user_email: string, user_avatar: string, user_password: string, providerAuth: boolean = false) {
    //cria user no bd
    const birth_date = null;
    try {
        return await prisma.public_user.create({
            data: {
                user_name,
                user_email,
                user_password,
                providerAuth,
                birth_date,
                perfil_photo: user_avatar,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setGames(user_id: number) {
    //cria games no bd
    try {
        return prisma.public_games.create({
            data: {
                user_id,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getGames(req: number) {
    //retorna lista de games pelo user_id
    try {
        const games = await prisma.public_games.findFirst({
            where: {
                user_id: req,
            },
        });
        return games;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addGames(req: any) {
    try {
        const { userID, jogo } = req;
        const user = await prisma.public_games.findMany({
            where: {
                user_id: userID,
            },
        });
        return prisma.public_games.update({
            where: { id: user[0].id },
            data: {
                games: {
                    push: jogo,
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function createRefreshToken(email: string) {
    const currentUserTokens = tokens.get(email) ?? [];
    const refreshToken = uuid();

    tokens.set(email, [...currentUserTokens, refreshToken]);

    return refreshToken;
}

export function checkRefreshTokenIsValid(email: string, refreshToken: string) {
    const storedRefreshTokens = tokens.get(email) ?? [];

    return storedRefreshTokens.some((token) => token === refreshToken);
}

export function invalidateRefreshToken(email: string, refreshToken: string) {
    const storedRefreshTokens = tokens.get(email) ?? [];

    tokens.set(
        email,
        storedRefreshTokens.filter((token) => token !== refreshToken)
    );
}
