import { Container, ChatItemContainer } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { ChatItemType, useChatbox } from '../../../hooks/useChatbox';
import { useState } from 'react';

type ChatItemProps = {
    data: ChatItemType;
};

export function ChatList() {
    const { chatbox } = useChatbox();

    return (
        <Container>
            {chatbox.map((item) => (
                <ChatItem key={item.user} data={item} />
            ))}
        </Container>
    );
}

function ChatItem({ data }: ChatItemProps) {
    const [chatInfo, setChatInfo] = useState(data);
    const { currChat, setCurrentChat } = useChatbox();

    function handleClick() {
        setCurrentChat(chatInfo.userId);
    }

    return (
        <ChatItemContainer onClick={handleClick} focus={currChat.userId === chatInfo.userId}>
            <div className="avatar">
                <Image className="avatarImg" src={Avatar} alt={data.user} width={200} height={200} />
            </div>
            <h3>{data.user}</h3>
            <h4>{data.lastMessage}</h4>
            <span>Just Now</span>
        </ChatItemContainer>
    );
}
