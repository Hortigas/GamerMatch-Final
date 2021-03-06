import { Matches, RefreshTokensStore } from './types';
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
        const arrayGames = { user_id, games };
        await addGames(arrayGames);
        return prisma.public_user.update({
            where: { id: user_id },
            data: {
                user_aboutme: aboutMe,
                user_photo: photo,
            },
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
        return users as UserData[];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUsersByNotId(req: number[]) {
    try {
        const users = await prisma.public_user.findMany({
            take: 5,
            where: {
                NOT: {
                    id: {
                        in: req,
                    },
                },
            },
        });
        return users as UserData[];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUsers() {
    try {
        const users = await prisma.public_user.findMany();
        return users as UserData[];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllMatch() {
    try {
        const matches = await prisma.public_match.findMany();
        return matches as Matches[];
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
                user_photo: user_avatar,
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
        const { user_id, games } = req;
        return prisma.public_games.upsert({
            where: { user_id: user_id },
            update: {
                games: games,
            },
            create: {
                user_id: user_id,
                games: games,
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
