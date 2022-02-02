import { RefreshTokensStore, UsersStore } from './types';
import { v4 as uuid } from 'uuid';

import { PrismaClient } from '@prisma/client';
import { getMaxListeners } from 'process';
export const prisma = new PrismaClient();

export const users: UsersStore = new Map();

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

export async function setUser(user_name: string, user_email: string, user_password: string) {
    //cria user no bd
    try {
        return prisma.public_user.create({
            data: {
                user_name,
                user_email,
                user_password,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function seedUserStore() {
    //testes
    /*const createUser = await setUser('ciclano', 'ciclano@gmail.com', '123456');
    const usuario = await getUser('ciclano@gmail.com');
    console.log(usuario);*/

    users.set('xxvsvitor98xx@gmail.com', {
        password: '1234',
        permissions: ['users.list', 'users.create', 'metrics.list'],
        roles: ['administrator'],
    });

    users.set('estagiario@rocketseat.team', {
        password: '123456',
        permissions: ['users.list', 'metrics.list'],
        roles: ['editor'],
    });
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
