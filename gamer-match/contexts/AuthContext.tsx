import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../src/services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { MessageType } from '../src/hooks/useChatbox';
import Avatar from './../src/assets/UserPics/userpic1.jpg';

type User = {
    userId: number;
    email: string;
    username: string;
    avatar?: string | StaticImageData;
    birth?: string;
    aboutme?: string;
};

type Match = {
    matchId: number;
    userId: number;
    username: string;
    avatar: string | StaticImageData;
    messages: MessageType[];
};

type GameType = {
    gameName: string;
    timePlayed: number;
    gameCategory: string;
};

type CategoryType = {
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
    setUser(value: User): void;
    matches: Match[];
    setMatches(value: Match[]): void;
    gameList: GameType[];
    setGameList(value: GameType[]): void;
    categories: CategoryType[];
    signOut(): void;
    signUp(credentials: SignUpcredentials): Promise<void>;
    updateProfile(): Promise<boolean>;
    convertToAge(date: string): number;
};

type AuthProviderProps = {
    children: ReactNode;
};

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
] as CategoryType[];

export const AuthContext = createContext({} as AuthContextData);

export function signOutFunc() {
    destroyCookie(undefined, 'GamerMatch.token');
    destroyCookie(undefined, 'GamerMatch.refreshToken');
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const [matches, setMatches] = useState([] as Match[]);
    const [gameList, setGameList] = useState<GameType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>(categoriesData);

    useEffect(() => {
        const { 'GamerMatch.token': token } = parseCookies();
        if (token) {
            api.get('/me')
                .then((response) => {
                    let { userId, email, username, avatar, birth, aboutme } = response.data as User;
                    if (!avatar) avatar = Avatar;
                    setUser({ userId, email, username, avatar, birth, aboutme });
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    useEffect(() => {
        if (!!user) {
            if (!user.avatar) {
                const newUser = user;
                newUser.avatar = Avatar;
                setUser(newUser);
            }
            fetchMatches();
            fetchGames();
        }
    }, [user]);

    async function updateProfile() {
        const response = await api.post('user/update', { user, gameList }).catch(function (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('Error', error.message);
            }
        });
        if (!response) return;
        toast.success('Mudanças realizadas com sucesso!');
        return true;
    }

    function convertToAge(date: string) {
        const today = new Date();
        const birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    async function fetchMatches() {
        try {
            const data = (await api.get(`/matches/${user.userId}`)).data as Match[];
            await api.get(`/findMatch/${user.userId}`)
            data.forEach((m) => {
                if (!m.avatar) m.avatar = Avatar;
            });
            setMatches(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchGames() {
        try {
            const response = await api.get(`/gameList/${user.userId}`);
            const Array = response.data.games as GameType[];
            const sortedArray = Array.sort((a, b) => {
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
            let { token, refreshToken, userId, email, username, avatar, birth, aboutme } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            if (!avatar) avatar = Avatar;
            setUser({ userId, email, username, avatar, birth, aboutme });
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/');
        } catch (err) {
            if (err.status == 401) toast.error('E-mail ou senha inválidos');
        }
    }

    async function signInWithGoogle(tokenId: string) {
        try {
            const response = await api.post('sessions/google', { tokenId });
            let { token, refreshToken, userId, email, username, avatar, birth, aboutme } = response.data;

            setCookie(undefined, 'GamerMatch.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            setCookie(undefined, 'GamerMatch.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
            if (!avatar) avatar = Avatar;
            setUser({ userId, email, username, avatar, birth, aboutme });
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

    return (
        <AuthContext.Provider value={{ signIn, signInWithGoogle, signOut, signUp, user, setUser, matches, setMatches, gameList, setGameList, categories, updateProfile, convertToAge }}>
            {children}
        </AuthContext.Provider>
    );
}
