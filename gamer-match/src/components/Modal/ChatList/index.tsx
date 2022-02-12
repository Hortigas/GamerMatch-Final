import { Container, ChatItemContainer } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { MatchType, useChatbox } from '../../../hooks/useChatbox';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import convertDate from 'date-and-time';

type ChatListProps = {
    className: string;
};

type ChatItemProps = {
    data: MatchType;
    online: boolean;
};

export function ChatList({ className }: ChatListProps) {
    const { onlineChatbox } = useChatbox();
    const { matches } = useContext(AuthContext);
    const arrSorted = matches.sort((a, b) => {
        const oa = onlineChatbox.some((u) => u === a.userId);
        const ob = onlineChatbox.some((u) => u === b.userId);
        if (!oa && ob) return 1;
        else if (oa && !ob) return -1;
        else {
            if (a.messages.length === 0 && b.messages.length > 0) return 1;
            if (a.messages.length > 0 && b.messages.length === 0) return -1;
            else {
                const dateA = new Date(a.messages.at(-1).timestamp);
                const dateB = new Date(b.messages.at(-1).timestamp);
                if (dateA < dateB) return 1;
                else return -1;
            }
        }
    });

    useEffect(() => {}, [onlineChatbox, matches]);

    return (
        <div className={className}>
            <Container>
                {arrSorted?.map((item) => (
                    <ChatItem key={item.userId} data={item} online={onlineChatbox.some((i) => i === item.userId)} />
                ))}
            </Container>
        </div>
    );
}

function ChatItem({ data, online }: ChatItemProps) {
    const [chatInfo, setChatInfo] = useState(data);
    const { currChat, setCurrentChat } = useChatbox();
    const lastmsg = data.messages.at(-1);
    let Avt: string | StaticImageData;
    if (data.avatar == '') Avt = Avatar;
    else Avt = data.avatar;

    function handleClick() {
        setCurrentChat(chatInfo.userId);
    }

    function checktime(time: string) {
        if (!time) return '';
        const date = new Date(time);
        const now = new Date();
        if (convertDate.format(date, 'DD/MM/YY') === convertDate.format(now, 'DD/MM/YY')) return convertDate.format(date, ' HH:mm');
        else return convertDate.format(date, 'DD/MM/YY');
    }

    return (
        <ChatItemContainer onClick={handleClick} focus={currChat?.userId === chatInfo.userId}>
            <div className="avatar">
                <Image className="avatarImg" src={Avt} alt={data.username} width={200} height={200} />
                <div className="status" style={{ background: online ? '#43b581' : '#99aab5' }} />
            </div>
            <h3>{data.username}</h3>
            <h4>{lastmsg?.messageContent ?? ''}</h4>
            <span>{checktime(lastmsg?.timestamp)}</span>
        </ChatItemContainer>
    );
}
