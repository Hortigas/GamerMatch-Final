import { createContext, ReactNode, useContext, useState } from 'react';

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
    message_content: string;
    timespan: string;
    user_id_sender: string;
    user_id_receiver: string;
};

interface ChatboxContextData {
    isOpen: boolean;
    setIsOpenFunction: (value: boolean) => void;
    currChat: ChatItemType;
    setCurrentChat: (userId: string) => void;
    chatbox: ChatItemType[];
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
] as ChatItemType[];

const ChatboxContext = createContext<ChatboxContextData>({} as ChatboxContextData);

export function ChatboxProvider({ children }: ChatboxProviderProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [chatbox, setChatbox] = useState<ChatItemType[]>(dataSource);
    const [currChat, setCurrChat] = useState({} as ChatItemType);
    const [messages, setMessages] = useState([] as MessageType[]);

    const setCurrentChat = (userId: string) => {
        const currentChat = chatbox.find((chat) => chat.userId === userId);
        setCurrChat(currentChat);
    };

    const setIsOpenFunction = (set: boolean) => {
        setIsOpen(set);
    };

    return <ChatboxContext.Provider value={{ isOpen, setIsOpenFunction, currChat, setCurrentChat, chatbox }}>{children}</ChatboxContext.Provider>;
}

export function useChatbox(): ChatboxContextData {
    const context = useContext(ChatboxContext);
    return context;
}
