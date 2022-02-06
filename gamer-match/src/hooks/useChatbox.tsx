import { parseCookies } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { socket } from '../services/socket';

interface ChatboxProviderProps {
    children: ReactNode;
}

export type ChatItemType = {
    avatar: string;
    userId: string;
    user: string;
    lastMessage: string;
    date: Date;
};

type MessageType = {
    userId: number;
    message_content: string;
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
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '2',
        user: 'Patolino',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '3',
        user: 'Joias7',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '4',
        user: 'Joias6',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '5',
        user: 'Joias5',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '6',
        user: 'Joias4',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '7',
        user: 'Joias3',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '8',
        user: 'Joias2',
        lastMessage: 'What are you doing?',
        date: new Date(),
    },
    {
        avatar: '',
        userId: '9',
        user: 'Joias1',
        lastMessage: 'What are you doing?',
        date: new Date(),
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
        const handleNewMessage = (newMessage) => {
            setMessages([...messages, newMessage]);
        };
        socket.on('connection', () => console.log('conectado'));
        socket.on('chat.message', (newMessage) => {
            handleNewMessage(newMessage);
        });
        return () => {
            socket.off('message.chat', handleNewMessage);
            socket.on('disconnect', () => {
                socket.removeAllListeners();
            });
        };
    }, [messages]);

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
