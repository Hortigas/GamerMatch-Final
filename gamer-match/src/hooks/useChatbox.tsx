import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SocketContext } from '../services/socket';
import convertDate from 'date-and-time';

interface ChatboxProviderProps {
    children: ReactNode;
}

type User = {
    userId: number;
    socketId: string;
};

export type MatchType = {
    matchId: number;
    userId: number;
    avatar: string;
    username: string;
    messages: MessageType[];
};

export type MessageType = {
    userId: number;
    toUserId: number;
    messageContent: string;
    timestamp: string;
    read?: boolean;
    matchId: number;
};

type ChatboxContextType = {
    isOpen: boolean;
    setIsOpenFunction: (value: boolean) => void;
    currChat: MatchType;
    setCurrentChat: (userId: number) => void;
    onlineChatbox: number[];
    message: string[];
    sendMessage: (str: string) => Promise<void>;
};

const ChatboxContext = createContext<ChatboxContextType>({} as ChatboxContextType);

export function ChatboxProvider({ children }: ChatboxProviderProps): JSX.Element {
    const socket = useContext(SocketContext);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState();
    const [onlineChatbox, setOnlineChatbox] = useState<number[]>([]);
    const [currChat, setCurrChat] = useState(null as MatchType);
    const { user, matches, setMatches } = useContext(AuthContext);

    useEffect(() => {
        if (!!message && !!user) addMessage(message);
    }, [message]);

    useEffect(() => {
        if (!!user) {
            if (!socket.connected) {
                socket.auth = { username: user.userId };
                socket.connect();
                socket.emit('add.user', user.userId);
                socket.on('get.users', (users: User[]) => {
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
        const newmatches = [...matches];
        if (message.userId === user.userId) {
            newmatches.find((c) => c.userId == message.toUserId).messages.push(message);
        } else {
            newmatches.find((c) => c.userId == message.userId).messages.push(message);
        }
        setMatches(newmatches);
    }

    const setCurrentChat = (userId: number) => {
        const currentChat = matches.find((chat) => chat.userId === userId);
        setCurrChat(currentChat);
    };

    const setIsOpenFunction = (set: boolean) => {
        setIsOpen(set);
    };

    const sendMessage = async (messageContent: string) => {
        const timestamp = convertDate.format(new Date(), 'YYYY-MM-DD HH:mm:ss:SSS');
        socket.emit('chat.message', { userId: user.userId, toUserId: currChat.userId, messageContent, timestamp, match: currChat.matchId, read: false });
        addMessage({ userId: user.userId, toUserId: currChat.userId, messageContent, timestamp, matchId: currChat.matchId });
    };

    return <ChatboxContext.Provider value={{ isOpen, setIsOpenFunction, currChat, setCurrentChat, onlineChatbox, message, sendMessage }}>{children}</ChatboxContext.Provider>;
}

export function useChatbox(): ChatboxContextType {
    const context = useContext(ChatboxContext);
    return context;
}
