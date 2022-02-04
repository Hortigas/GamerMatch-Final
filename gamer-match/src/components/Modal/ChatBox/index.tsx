import { Container, SelectedUser } from './styles';
import Image from 'next/image';
import Avatar from '../../../assets/UserPics/userpic1.jpg';

export function ChatBox() {
    return (
        <Container>
            <SelectedUser>
                <div className="avatar">
                    <Image className="avatarImg" src={Avatar} alt="Rebeca" width={200} height={200} />
                </div>

                <h3>Rebeca</h3>
            </SelectedUser>
        </Container>
    );
}
