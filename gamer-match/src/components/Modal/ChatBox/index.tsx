import { Container, SelectedUser, Conversations, MessageInput, Balloon, BalloonWrapper } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { useChatbox } from '../../../hooks/useChatbox';
import dateLib from 'date-and-time';
import { createRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

type MessageProps = {
    messageData: MessageData;
};

type MessageData = {
    own: boolean;
    message_content: string;
};

export function ChatBox() {
    const messagesEndRef = createRef<HTMLDivElement>();
    const { currChat, messages, sendMessage } = useChatbox();
    const { user } = useContext(AuthContext);

    function handleKeyPress(e) {
        let str: string = e.target.value;
        if (str.length > 255) {
            str = str.slice(0, 255);
        }
        e.target.value = str;
        if (e.key === 'Enter' && str.length > 0) {
            str = str.trim();
            sendMessage(str);
            e.target.value = '';
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container>
            <SelectedUser>
                <div className="avatar">
                    <Image className="avatarImg" src={Avatar} alt={currChat.user} width={200} height={200} />
                </div>
                <h3>{currChat.user}</h3>
            </SelectedUser>
            <Conversations>
                {messages.map((data, index) => {
                    return <Message key={index} messageData={{ message_content: data.message_content, own: user.userId == data.userId }} />;
                })}
                <div ref={messagesEndRef} />
            </Conversations>
            <MessageInput onKeyPress={handleKeyPress} />
        </Container>
    );
}

function Message({ messageData }: MessageProps) {
    const { own, message_content } = messageData;

    var dateUTC = new Date();
    var userTimezoneOffset = dateUTC.getTimezoneOffset();
    const date = dateLib.format(dateLib.addMinutes(dateUTC, -userTimezoneOffset), 'HH:mm');

    return (
        <BalloonWrapper>
            <Balloon className={own ? 'right' : 'left'}>
                <span className="message">{message_content}</span>
                <span className="date">{date}</span>
            </Balloon>
        </BalloonWrapper>
    );
}
