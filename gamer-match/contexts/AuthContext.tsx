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

type GameType = {
    gameName: string;
    timePlayed: number;
    gameCategory: string;
};

type categoryType = {
    id: number;
    name: string;
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
    gameList: GameType[];
    setGameList(value: GameType[]): void;
    categories: categoryType[];
    signOut(): void;
    signUp(credentials: SignUpcredentials): Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

const dataT = [
    { gameName: 'Overwatch', gameCategory: 'FPS', timePlayed: 1230 },
    { gameName: 'Minecraft', gameCategory: 'Survival', timePlayed: 402 },
    { gameName: 'CS-GO', gameCategory: 'FPS', timePlayed: 2311 },
    { gameName: 'LOL', gameCategory: 'FPS', timePlayed: 1511 },
    { gameName: 'Heroes of the Storm', gameCategory: 'FPS', timePlayed: 511 },
    { gameName: 'World of Warcraft', gameCategory: 'FPS', timePlayed: 511 },
    { gameName: 'Valorant', gameCategory: 'FPS', timePlayed: 211 },
    { gameName: 'Pinball', gameCategory: 'FPS', timePlayed: 133 },
    { gameName: 'Animal Crossing', gameCategory: 'FPS', timePlayed: 4031 },
] as GameType[];

const categoriesData = [
    {
        id: 1,
        name: 'Corrida',
    },
    {
        id: 2,
        name: 'Tiro',
    },
    {
        id: 3,
        name: 'Aventura',
    },
    {
        id: 4,
        name: 'Ação',
    },
    {
        id: 5,
        name: 'RPG',
    },
    {
        id: 6,
        name: 'Luta',
    },
    {
        id: 7,
        name: 'Puzzle',
    },
    {
        id: 10,
        name: 'Estratégia',
    },
    {
        id: 11,
        name: 'Arcade',
    },
    {
        id: 14,
        name: 'Simulação',
    },
    {
        id: 15,
        name: 'Esportes',
    },
    {
        id: 17,
        name: 'Carta',
    },
    {
        id: 19,
        name: 'Família',
    },
    {
        id: 28,
        name: 'Tabuleiro',
    },
    {
        id: 34,
        name: 'Educacional',
    },
    {
        id: 40,
        name: 'Casual',
    },
    {
        id: 51,
        name: 'Indie',
    },
    {
        id: 59,
        name: 'Multiplayer massivo',
    },
    {
        id: 83,
        name: 'Plataforma',
    },
] as categoryType[];

export const AuthContext = createContext({} as AuthContextData);

export function signOutFunc() {
    destroyCookie(undefined, 'GamerMatch.token');
    destroyCookie(undefined, 'GamerMatch.refreshToken');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const [matches, setMatches] = useState([] as Match[]);
    const [gameList, setGameList] = useState<GameType[]>();
    const [categories, setCategories] = useState<categoryType[]>(categoriesData);

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
            fetchMatches();
            fetchGames();
        }
    }, [user]);

    async function fetchMatches() {
        try {
            const data = (await api.get(`/matches/${user.userId}`)).data as Match[];
            setMatches(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchGames() {
        try {
            //const data = (await api.get(`/gameList/${user.userId}`)) as GameType[];
            const sortedArray = dataT.sort((a, b) => {
                return b.timePlayed - a.timePlayed;
            });
            setGameList(sortedArray);
        } catch (err) {
            console.log(err);
        }
    }

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

    return <AuthContext.Provider value={{ signIn, signInWithGoogle, signOut, signUp, user, matches, setMatches, gameList, setGameList, categories }}>{children}</AuthContext.Provider>;
}
function tostify(err: any) {
    throw new Error('Function not implemented.');
}
