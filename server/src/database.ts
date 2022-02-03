import { RefreshTokensStore } from './types';
import { v4 as uuid } from 'uuid';

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export const tokens: RefreshTokensStore = new Map();

export async function getUser(req: string) {
    //consulta user pelo email
    try {
        const user = await prisma.public_user.findUnique({
            where: {
                user_email: req,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function setUser(user_name: string, user_email: string, user_password: string, providerAuth: boolean = false) {
    //cria user no bd
    try {
        return prisma.public_user.create({
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
