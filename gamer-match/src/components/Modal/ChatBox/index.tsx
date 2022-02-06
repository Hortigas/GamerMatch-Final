import { Container, SelectedUser, Conversations, MessageInput, Balloon, BalloonWrapper } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { useChatbox } from '../../../hooks/useChatbox';
import dateLib from 'date-and-time';
import { createRef, useEffect, useState } from 'react';

type MessageProps = {
    messageData: MessageData;
};

type MessageData = {
    own: boolean;
    content: string;
    timestamp: string;
};

const testArray = [
    { own: true, content: 'hello there!', timestamp: '2022-02-05 21:19:04.902276' },
    { own: false, content: 'hi Vitor, i was questioning myself how fucking dumb I am :P', timestamp: '2022-02-05 22:43:43.142661' },
    { own: true, content: 'naah, u are way more smart tham u', timestamp: '2022-02-05 22:58:04.142661' },
    { own: true, content: 'hi Vitor, i was questioning myself howasaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaas fucking daaaaaaaumb I am :P', timestamp: '2022-02-05 22:53:03.142661' },
] as MessageData[];

export function ChatBox() {
    const messagesEndRef = createRef<HTMLDivElement>();
    const { currChat } = useChatbox();
    const [messages, setMessages] = useState(testArray);

    function handleKeyPress(e) {
        let str: string = e.target.value;
        if (str.length > 255) {
            e.target.value = str.slice(0, 255);
            str = str.slice(0, 255);
        }
        console.log(str.length);
        if (e.key === 'Enter') {
            setMessages([...messages, { own: true, content: str, timestamp: Date.now().toString() }]);
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
                {messages.map((i) => {
                    return <Message key={i.timestamp} messageData={i} />;
                })}
                <div ref={messagesEndRef} />
            </Conversations>
            <MessageInput onKeyPress={handleKeyPress} />
        </Container>
    );
}

function Message({ messageData }: MessageProps) {
    const { own, content, timestamp } = messageData;

    var dateUTC = new Date(timestamp);
    var userTimezoneOffset = dateUTC.getTimezoneOffset();
    const date = dateLib.format(dateLib.addMinutes(dateUTC, -userTimezoneOffset), 'HH:mm');

    return (
        <BalloonWrapper>
            <Balloon className={own ? 'right' : 'left'}>
                <span className="message">{content}</span>
                <span className="date">{date}</span>
            </Balloon>
        </BalloonWrapper>
    );
}
