import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container } from '../components/Profile/styles';
import Image from 'next/image';
import Avatar from '../assets/UserPics/userpic1.jpg';

export default function Profile() {
    return (
        <Container>
            <div className="profile wrapper">
                <Image src={Avatar} alt="hero image Gamer match" width="175px" height="175px" className="avatar" />
            </div>
            <div className="gamesList wrapper">
                <h3>Seus jogos mais jogados:</h3>
            </div>
        </Container>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
