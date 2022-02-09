import { Container, ChatItemContainer } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { MatchType, useChatbox } from '../../../hooks/useChatbox';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

type ChatItemProps = {
    data: MatchType;
    online: boolean;
};

export function ChatList() {
    const { onlineChatbox } = useChatbox();
    const { matches } = useContext(AuthContext);

    useEffect(() => {}, [onlineChatbox]);

    return (
        <Container>
            {matches?.map((item) => (
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
                <Image className="avatarImg" src={Avatar} alt={data.username} width={200} height={200} />
                <div className="status" style={{ background: online ? '#43b581' : '#99aab5' }} />
            </div>
            <h3>{data.username}</h3>
            <h4>test</h4>
            <span>Just Now</span>
        </ChatItemContainer>
    );
}
