import { parseCookies } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../services/apiClient';
import { socket } from '../services/socket';

interface ChatboxProviderProps {
    children: ReactNode;
}

export type ChatItemType = {
    avatar: string;
    userId: string;
    user: string;
    lastMessage: MessageType;
};

type MessageType = {
    userId: number;
    toUserId: number;
    message_content: string;
    timestamp: string;
};

type ChatboxContextType = {
    isOpen: boolean;
    setIsOpenFunction: (value: boolean) => void;
    currChat: ChatItemType;
    setCurrentChat: (userId: string) => void;
    chatbox: ChatItemType[];
    messages: MessageType[];
    sendMessage: (str: string) => Promise<void>;
};

const dataSource = [
    {
        avatar: '',
        userId: '1',
        user: 'Rebeca',
        lastMessage: { userId: 1, message_content: 'What are you doing?', toUserId: 2 },
    },
    {
        avatar: '',
        userId: '2',
        user: 'Patolino',
        lastMessage: { userId: 1, message_content: 'What are you doing?', toUserId: 2 },
    },
    {
        avatar: '',
        userId: '3',
        user: 'Joias7',
        lastMessage: { userId: 1, message_content: 'What are you doing?', toUserId: 2 },
    },
    {
        avatar: '',
        userId: '4',
        user: 'Joias6',
        lastMessage: { userId: 1, message_content: 'What are you doing?', toUserId: 2 },
    },
] as ChatItemType[];

const ChatboxContext = createContext<ChatboxContextType>({} as ChatboxContextType);

export function ChatboxProvider({ children }: ChatboxProviderProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [chatbox, setChatbox] = useState<ChatItemType[]>(dataSource);
    const [currChat, setCurrChat] = useState({} as ChatItemType);
    const [messages, setMessages] = useState([] as MessageType[]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!!user) {
            SearchMatches().then((data: any) => {
                setChatbox(data);
            });
        }
    }, [user]);

    useEffect(() => {
        if (!!user) {
            if (!socket.connected) {
                socket.auth = { username: user.userId };
                socket.connect();
                socket.emit('add.user', user.userId);
            }
        } else {
            if (socket.connected) {
                socket.disconnect();
            }
        }
    }, [user]);

    const SearchMatches = async () => {
        try {
            const response = await api.get(`/matches/${user.userId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const setCurrentChat = (userId: string) => {
        const currentChat = chatbox.find((chat) => chat.userId === userId);
        setCurrChat(currentChat);
    };

    const setIsOpenFunction = (set: boolean) => {
        setIsOpen(set);
    };

    const sendMessage = async (message_content: string) => {
        socket.emit('chat.message', { userId: user.userId, message_content });
    };

    return <ChatboxContext.Provider value={{ isOpen, setIsOpenFunction, currChat, setCurrentChat, chatbox, messages, sendMessage }}>{children}</ChatboxContext.Provider>;
}

export function useChatbox(): ChatboxContextType {
    const context = useContext(ChatboxContext);
    return context;
}
