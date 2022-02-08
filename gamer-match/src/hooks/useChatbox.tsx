import { parseCookies } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../services/apiClient';
import { SocketContext } from '../services/socket';
import convertDate from 'date-and-time';

interface ChatboxProviderProps {
    children: ReactNode;
}

export type ChatItemType = {
    avatar: string;
    userId: number;
    username: string;
    messages: MessageType[];
};

type MessageType = {
    userId: number;
    toUserId: number;
    messageContent: string;
    timestamp: string;
};

type ChatboxContextType = {
    isOpen: boolean;
    setIsOpenFunction: (value: boolean) => void;
    currChat: ChatItemType;
    setCurrentChat: (userId: number) => void;
    CH: ChatItemType[];
    onlineChatbox: number[];
    message: string[];
    sendMessage: (str: string) => Promise<void>;
};

const ChatboxContext = createContext<ChatboxContextType>({} as ChatboxContextType);

export function ChatboxProvider({ children }: ChatboxProviderProps): JSX.Element {
    const socket = useContext(SocketContext);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState();
    const [CH, setCH] = useState([] as ChatItemType[]);
    const [onlineChatbox, setOnlineChatbox] = useState<number[]>([]);
    const [currChat, setCurrChat] = useState(null);
    const { user } = useContext(AuthContext);

    let msg;
    useEffect(() => {
        if (!!user) {
            SearchMatches().then((data) => {
                setCH(data);
            });
        }
    }, []);

    useEffect(() => {
        if (!!message && !!user) addMessage(message);
    }, [message]);

    useEffect(() => {
        if (!!user) {
            SearchMatches().then((data) => {
                setCH(data);
            });
        }
    }, [user]);

    useEffect(() => {
        if (!!user) {
            if (!socket.connected) {
                socket.auth = { username: user.userId };
                socket.connect();
                socket.emit('add.user', user.userId);
                socket.on('get.users', (users) => {
                    setOnlineChatbox(users.map((i) => i.userId));
                });
                socket.on('chat.message', (data) => {
                    setMessage(data);
                });
                socket.on('user.Id', () => socket.emit('add.user', user.userId));
            }
        } else {
            if (socket.connected) {
                socket.disconnect();
            }
        }
    }, [user]);

    function addMessage(message: MessageType) {
        const newCH = [...CH];
        if (message.userId === user.userId) {
            newCH.find((c) => c.userId == message.toUserId).messages.push(message);
        } else {
            newCH.find((c) => c.userId == message.userId).messages.push(message);
        }
        setCH(newCH);
    }

    async function SearchMatches() {
        const res = await api.get(`/matches/${user.userId}`);
        return res.data;
    }

    const setCurrentChat = (userId: number) => {
        const currentChat = CH.find((chat) => chat.userId === userId);
        setCurrChat(currentChat);
    };

    const setIsOpenFunction = (set: boolean) => {
        setIsOpen(set);
    };

    const sendMessage = async (messageContent: string) => {
        const timestamp = convertDate.format(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS');
        socket.emit('chat.message', { userId: user.userId, toUserId: currChat.userId, messageContent, timestamp });
        addMessage({ userId: user.userId, toUserId: currChat.userId, messageContent, timestamp });
    };

    return <ChatboxContext.Provider value={{ isOpen, setIsOpenFunction, currChat, setCurrentChat, CH, onlineChatbox, message, sendMessage }}>{children}</ChatboxContext.Provider>;
}

export function useChatbox(): ChatboxContextType {
    const context = useContext(ChatboxContext);
    return context;
}
