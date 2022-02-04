import { Container, ChatItemContainer } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';

type ChatItemData = {
    avatar: string;
    user: string;
    lastMessage: string;
    date: Date;
};

type ChatItemProps = {
    data: ChatItemData;
};

export function ChatList() {
    const dataSource = [
        {
            avatar: '',
            user: 'Rebeca',
            lastMessage: 'What are you doing?',
            date: new Date(),
        },
        {
            avatar: '',
            user: 'Patolino',
            lastMessage: 'What are you doing?',
            date: new Date(),
        },
        {
            avatar: '',
            user: 'Joias',
            lastMessage: 'What are you doing?',
            date: new Date(),
        },
    ] as ChatItemData[];

    return (
        <Container>
            {dataSource.map((item) => (
                <ChatItem key={item.user} data={item} />
            ))}
        </Container>
    );
}

function ChatItem({ data }: ChatItemProps) {
    return (
        <ChatItemContainer>
            <div className="avatar">
                <Image className="avatarImg" src={Avatar} alt={data.user} width={200} height={200} />
            </div>
            <h3>{data.user}</h3>
            <h4>{data.lastMessage}</h4>
            <span>Just Now</span>
        </ChatItemContainer>
    );
}
