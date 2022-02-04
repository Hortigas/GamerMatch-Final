import { createContext, ReactNode, useContext, useState } from 'react';

interface ChatboxProviderProps {
    children: ReactNode;
}

type ChatItemProps = {
    avatar: string;
    userId: string;
    user: string;
    lastMessage: string;
    date: Date;
};

type MessageProps = {};

interface ChatboxContextData {
    setCurrentChat: (userId: string) => void;
    currChat: ChatItemProps;
    chatbox: ChatItemProps[];
}

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
] as ChatItemProps[];

const ChatboxContext = createContext<ChatboxContextData>({} as ChatboxContextData);

export function ChatboxProvider({ children }: ChatboxProviderProps): JSX.Element {
    const [chatbox, setChatbox] = useState<ChatItemProps[]>(dataSource);
    const [currChat, setCurrChat] = useState(dataSource[0]);
    const [messages, setMessages] = useState([] as MessageProps[]);

    const setCurrentChat = (userId: string) => {
        const currentChat = chatbox.find((chat) => chat.userId === userId);
        setCurrChat(currentChat);
    };

    return <ChatboxContext.Provider value={{ currChat, setCurrentChat, chatbox }}>{children}</ChatboxContext.Provider>;
}

export function useChatbox(): ChatboxContextData {
    const context = useContext(ChatboxContext);
    return context;
}
