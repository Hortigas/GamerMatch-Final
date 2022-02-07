import { Container, ChatItemContainer } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { ChatItemType, useChatbox } from '../../../hooks/useChatbox';
import { useState } from 'react';

type ChatItemProps = {
    data: ChatItemType;
    online: boolean;
};

export function ChatList() {
    const { CH, onlineChatbox } = useChatbox();

    return (
        <Container>
            {CH?.map((item) => (
                <ChatItem key={item.userId} data={item} online={onlineChatbox.some((i) => i === item.userId)} />
            ))}
        </Container>
    );
}

function ChatItem({ data, online }: ChatItemProps) {
    const [chatInfo, setChatInfo] = useState(data);
    const { currChat, setCurrentChat } = useChatbox();

    function handleClick() {
        setCurrentChat(chatInfo.userId);
    }

    return (
        <ChatItemContainer onClick={handleClick} focus={currChat?.userId === chatInfo.userId}>
            <div className="avatar">
                <Image className="avatarImg" src={Avatar} alt={data.user} width={200} height={200} />
                <div className={online ? 'status' : ''} />
            </div>
            <h3>{data.user}</h3>
            <h4>test</h4>
            <span>Just Now</span>
        </ChatItemContainer>
    );
}
