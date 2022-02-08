import { RefreshTokensStore } from './types';
import { v4 as uuid } from 'uuid';
import { UserData } from './types';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export const tokens: RefreshTokensStore = new Map();

export async function getMessage(req: number[]) {
    //busca msg recebidas/enviadas
    try {
        const msg = await prisma.public_message.findMany({
            where: {
                match: {
                    in: req,
                },
            },
        });
        return msg;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setMessage(message_content: string, user_id_sender: number, user_id_receiver: number, match: number) {
    //cria msg no bd
    try {
        return prisma.public_message.create({
            data: {
                message_content,
                user_id_sender,
                user_id_receiver,
                match,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

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

export async function updateMessages(req: any){
    try {
        const { match } = req;
        return prisma.public_match.update({
            where: { id: match },
            data:{
                messages:{
                    push: req,
                },
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
        return users.map((u) => {
            return { userId: u.id, username: u.user_name, avatar: '', messages: [] };
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setUser(user_name: string, user_email: string, user_password: string, providerAuth: boolean = false) {
    //cria user no bd
    try {
        return await prisma.public_user.create({
            data: {
                user_name,
                user_email,
                user_password,
                providerAuth,
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
