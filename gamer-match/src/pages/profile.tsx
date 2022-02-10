import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Profile/styles';
import Image from 'next/image';
import Avatar from '../assets/UserPics/userpic1.jpg';
import Control from '../assets/control.svg';

const dataT = [
    { name: 'Overwatch', played: 1230 },
    { name: 'Minecraft', played: 402 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
];

export default function Profile() {
    return (
        <Container>
            <div className="profile wrapper">
                <Image src={Avatar} alt="hero image Gamer match" width="100px" height="100px" className="avatar" />
            </div>
            <div className="gamesList wrapper">
                <h3>Seus jogos mais jogados:</h3>
                <GamesList />
            </div>
            <div className="aboutme wrapper">Sobre me</div>
        </Container>
    );
}

function GamesList() {
    return (
        <UL>
            {dataT.map((i) => (
                <li>
                    <div className="gameIcon">
                        <Image src={Control} width="40px" />
                    </div>
                    {i.name} <span> ({i.played} horas)</span>
                </li>
            ))}
        </UL>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
