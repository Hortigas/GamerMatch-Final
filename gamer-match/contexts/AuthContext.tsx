import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../src/services/api';
import { setCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';
import Router from 'next/router';

type User = {
    email: string;
    permissions: string[];
    roles: string[];
};

type Decoded = {
    sub: string;
};

type SignIncredentials = {
    email: string;
    password: string;
};

type AuthContextData = {
    signIn(credentials: SignIncredentials): Promise<void>;
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'GamerMatch.token': token } = parseCookies();
        if (token) {
            const decoded: Decoded = decode(token);
            setUser({ email: decoded.sub, permissions: [], roles: [] });
        }
    }, []);

    async function signIn({ email, password }: SignIncredentials) {
        try {
            const response = await api.post('sessions', { email, password });
            const { token, refreshToken, permissions, roles } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email, permissions, roles });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>{children}</AuthContext.Provider>;
}
