import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../src/services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

type User = {
    email: string;
};

type Decoded = {
    sub: string;
};

type SignIncredentials = {
    email: string;
    hash: string;
};

type SignUpcredentials = {
    username: string;
    email: string;
    hash: string;
};

type AuthContextData = {
    signIn(credentials: SignIncredentials): Promise<void>;
    signInWithGoogle(tokenId: string): Promise<void>;
    user: User;
    isAuthenticated: boolean;
    signOut(): Promise<void>;
    signUp(credentials: SignUpcredentials): Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOutFunc() {
    destroyCookie(undefined, 'GamerMatch.token');
    destroyCookie(undefined, 'GamerMatch.refreshToken');
    Router.push('/login');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'GamerMatch.token': token } = parseCookies();
        if (token) {
            api.get('/me')
                .then((response) => {
                    const { email } = response.data;
                    setUser({ email });
                })
                .catch(() => {
                    signOutFunc();
                });
        }
    }, []);

    async function signIn({ email, hash }: SignIncredentials) {
        try {
            const response = await api.post('sessions', { email, hash });
            const { token, refreshToken, permissions, roles } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    async function signInWithGoogle(tokenId: string) {
        try {
            const response = await api.post('sessions/google', { tokenId });
            const { token, refreshToken, email } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    async function signOut() {
        setUser({ email: '' });
        const isAuthenticated = false;
        signOutFunc();
    }

    async function signUp({ username, email, hash }: SignUpcredentials) {
        const response = await api.post('sessions/create', { username, email, hash }).catch(function (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('Error', error.message);
            }
        });
        if (!response) return;
        toast.success('Cadastro realizado com sucesso!');
        Router.push('/login');
    }

    return <AuthContext.Provider value={{ signIn, signInWithGoogle, signOut, signUp, isAuthenticated, user }}>{children}</AuthContext.Provider>;
}
