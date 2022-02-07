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
    messageContent: string;
};

export function ChatBox() {
    const messagesEndRef = createRef<HTMLDivElement>();
    const { currChat, sendMessage } = useChatbox();
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
    }, [currChat]);

    if (currChat) {
        return (
            <Container>
                <SelectedUser>
                    <div className="avatar">
                        <Image className="avatarImg" src={Avatar} alt={currChat.username} width={200} height={200} />
                    </div>
                    <h3>{currChat.username}</h3>
                </SelectedUser>
                <Conversations>
                    {currChat.messages?.map((data, index) => {
                        return <Message key={index} messageData={{ messageContent: data.messageContent, own: user.userId == data.userId }} />;
                    })}
                    <div ref={messagesEndRef} />
                </Conversations>
                <MessageInput onKeyPress={handleKeyPress} />
            </Container>
        );
    } else {
        return <div></div>;
    }
}

function Message({ messageData }: MessageProps) {
    const { own, messageContent } = messageData;

    var dateUTC = new Date();
    var userTimezoneOffset = dateUTC.getTimezoneOffset();
    const date = dateLib.format(dateLib.addMinutes(dateUTC, -userTimezoneOffset), 'HH:mm');

    return (
        <BalloonWrapper>
            <Balloon className={own ? 'right' : 'left'}>
                <span className="message">{messageContent}</span>
                <span className="date">{date}</span>
            </Balloon>
        </BalloonWrapper>
    );
}
