import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../src/services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { MessageType } from '../src/hooks/useChatbox';

type User = {
    email: string;
    username: string;
    userId: number;
};

type Match = {
    matchId: number;
    userId: number;
    avatar: string;
    username: string;
    messages: MessageType[];
};

type Games = {
    gameId: number;
    userId: number;
    games: GameType[];
};

type GameType = {
    gameName: string;
    timePlayed: string;
    gameCategory: string;
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
    matches: Match[];
    setMatches(value: Match[]): void;
    games: Games;
    setGames(value: Games): void;
    signOut(): void;
    signUp(credentials: SignUpcredentials): Promise<void>;
    uploadIMG(imgBase64: string): Promise<void>;
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
    const [matches, setMatches] = useState([] as Match[]);
    const [games, setGames] = useState<Games>();

    useEffect(() => {
        const { 'GamerMatch.token': token } = parseCookies();
        if (token) {
            api.get('/me')
                .then((response) => {
                    const { email, username, userId } = response.data;
                    setUser({ email, username, userId });
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    useEffect(() => {
        if (!!user) {
            searchMatches();
            //searchGames();
        }
    }, [user]);

    async function searchMatches() {
        const data = (await api.get(`/matches/${user.userId}`)).data as Match[];
        setMatches(data);
    }

    /*async function searchGames() {
        const data = await api.get(`/games/${user.userId}`) as Games;
        setGames(data);
    }*/

    async function signIn({ inputEmail, inputHash }: SignIncredentials) {
        try {
            const response = await api.post('sessions', { email: inputEmail, hash: inputHash });
            const { token, refreshToken, email, username, userId } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email, username, userId });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            if (err.status == 401) toast.error('E-mail ou senha inválidos');
        }
    }

    async function signInWithGoogle(tokenId: string) {
        try {
            const response = await api.post('sessions/google', { tokenId });
            const { token, refreshToken, email, username, userId } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });

            setUser({ email, username, userId });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            toast.error(err.message);
        }
    }

    function signOut() {
        signOutFunc();
        setUser(undefined);
        Router.push('/login');
    }

    async function signUp({ inputUsername, inputEmail, inputHash }: SignUpcredentials) {
        const response = await api.post('sessions/create', { username: inputUsername, email: inputEmail, hash: inputHash }).catch(function (error) {
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

    async function uploadIMG(imgBase64: string) {
        const response = await api.post('/upload', { image: imgBase64, id: user.userId}).catch(function (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('Error', error.message);
            }
        });
        if (!response) return;
        toast.success('Imagem carregada com sucesso!');
        Router.push('/profile');
    }

    return <AuthContext.Provider value={{ signIn, signInWithGoogle, signOut, signUp, user, matches, setMatches, games, setGames, uploadIMG }}>{children}</AuthContext.Provider>;
}
function tostify(err: any) {
    throw new Error('Function not implemented.');
}
