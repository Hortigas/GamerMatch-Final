import { Container, SelectedUser, Conversations, MessageInput, Balloon, BalloonWrapper } from './styles';
import Image from 'next/image';
import { useChatbox } from '../../../hooks/useChatbox';
import convertDate from 'date-and-time';
import { createRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

type ChatBoxProps = {
    className: string;
};

type MessageProps = {
    messageData: MessageData;
};

type MessageData = {
    own: boolean;
    messageContent: string;
    time: string;
};

export function ChatBox({ className }: ChatBoxProps) {
    const messagesEndRef = createRef<HTMLDivElement>();
    const { currChat, sendMessage } = useChatbox();
    const { user, matches } = useContext(AuthContext);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [matches, currChat]);

    function handleKeyPress(e) {
        let str: string = e.target.value;
        if (str.length > 255) {
            str = str.slice(0, 255);
        }
        e.target.value = str;
        if (e.key === 'Enter' && str.length > 0) {
            str = str.trim();
            sendMessage(str);
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            e.target.value = '';
        }
    }

    return (
        <div className={className}>
            <Container>
                <SelectedUser>
                    <div className="avatar">
                        <Image className="avatarImg" src={currChat.avatar} alt={currChat.username} width={200} height={200} />
                    </div>
                    <h3>{currChat.username}</h3>
                </SelectedUser>
                <Conversations>
                    {currChat.messages?.map((data, index) => {
                        return <Message key={index} messageData={{ messageContent: data.messageContent, own: user.userId == data.userId, time: data.timestamp }} />;
                    })}
                    <div ref={messagesEndRef} />
                </Conversations>
                <MessageInput onKeyPress={handleKeyPress} />
            </Container>
        </div>
    );
}

function Message({ messageData }: MessageProps) {
    const { own, messageContent, time } = messageData;

    const dateUTC = new Date(time);
    const date = convertDate.format(dateUTC, 'HH:mm');

    return (
        <BalloonWrapper>
            <Balloon className={own ? 'right' : 'left'}>
                <span className="message">{messageContent}</span>
                <span className="date">{date}</span>
            </Balloon>
        </BalloonWrapper>
    );
}
