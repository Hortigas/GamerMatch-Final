import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../src/services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

type User = {
    email: string;
    username: string;
};

type Decoded = {
    sub: string;
};

type SignIncredentials = {
    inputEmail: string;
    inputHash: string;
};

type SignUpcredentials = {
    inputUsername: string;
    inputEmail: string;
    inputHash: string;
};

type AuthContextData = {
    signIn(credentials: SignIncredentials): Promise<void>;
    signInWithGoogle(tokenId: string): Promise<void>;
    user: User;
    signOut(): void;
    signUp(credentials: SignUpcredentials): Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOutFunc() {
    destroyCookie(undefined, 'GamerMatch.token');
    destroyCookie(undefined, 'GamerMatch.refreshToken');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const { 'GamerMatch.token': token } = parseCookies();
        if (token) {
            api.get('/me')
                .then((response) => {
                    const { email, username } = response.data;
                    setUser({ email, username });
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    async function signIn({ inputEmail, inputHash }: SignIncredentials) {
        try {
            const response = await api.post('sessions', { email: inputEmail, hash: inputHash });
            const { token, refreshToken, email, username } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email, username });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            toast.error('E-mail ou senha inválidos');
        }
    }

    async function signInWithGoogle(tokenId: string) {
        try {
            const response = await api.post('sessions/google', { tokenId });
            const { token, refreshToken, email, username } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email, username });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            toast.error(err.message);
        }
    }

    function signOut() {
        signOutFunc();
        setUser(null);
        Router.push('/login');
    }

    async function signUp({ inputUsername, inputEmail, inputHash }: SignUpcredentials) {
        const response = await api.post('sessions/create', { inputUsername, inputEmail, inputHash }).catch(function (error) {
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

    return <AuthContext.Provider value={{ signIn, signInWithGoogle, signOut, signUp, user }}>{children}</AuthContext.Provider>;
}
function tostify(err: any) {
    throw new Error('Function not implemented.');
}
