import { Container, ChatItemContainer } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { MatchType, useChatbox } from '../../../hooks/useChatbox';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import convertDate from 'date-and-time';

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
    const lastmsg = data.messages.at(-1);
    function handleClick() {
        setCurrentChat(chatInfo.userId);
    }
    function checkmsg(msg:any){
        if(typeof msg == 'undefined' ){
            return '';
        }else{
            return msg.messageContent;
        }
    }
    function checktime(time:any){
        if(typeof time == 'undefined' ){
            return '';
        }else{
            const date = new Date(time.timestamp);
            return convertDate.format(date, ' HH:mm DD/MM/YY');;
        }
    }

    return (
        <ChatItemContainer onClick={handleClick} focus={currChat?.userId === chatInfo.userId}>
            <div className="avatar">
                <Image className="avatarImg" src={Avatar} alt={data.username} width={200} height={200} />
                <div className="status" style={{ background: online ? '#43b581' : '#99aab5' }} />
            </div>
            <h3>{data.username}</h3>
            
            <h4>{checkmsg(lastmsg)}</h4>
            <span>{checktime(lastmsg)}</span>
        </ChatItemContainer>
    );
}
