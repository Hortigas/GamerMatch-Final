import { Container, SelectedUser } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';
import { useChatbox } from '../../../hooks/useChatbox';

export function ChatBox() {
    const { currChat } = useChatbox();

    return (
        <Container>
            <SelectedUser>
                <div className="avatar">
                    <Image className="avatarImg" src={Avatar} alt={currChat.user} width={200} height={200} />
                </div>
                <h3>{currChat.user}</h3>
            </SelectedUser>
        </Container>
    );
}
