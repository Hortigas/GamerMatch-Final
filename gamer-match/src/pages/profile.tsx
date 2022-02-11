import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Profile/styles';
import Image from 'next/image';
import Avatar from '../assets/UserPics/userpic1.jpg';
import Control from '../assets/control.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { LoginButton } from './../components/Profile/LoginButton/index';
import { MdModeEditOutline } from 'react-icons/md';

const dataT = [
    { name: 'Overwatch', played: 1230 },
    { name: 'Minecraft', played: 402 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
];

export default function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <div className="profile wrapper">
                <div className="info">
                    <Image src={Avatar} alt="hero image Gamer match" width="180px" height="180px" className="avatar" />
                    <MdModeEditOutline className="editPerfil" />
                    <div className="name">
                        <h2>{user?.username}</h2>
                        <h3>23 anos</h3>
                    </div>
                </div>
                <div className="buttons">
                    <LoginButton buttonType={'blizzard'} />
                    <LoginButton buttonType={'steam'} />
                    <LoginButton buttonType={'epicGames'} />
                </div>
            </div>

            <div className="gamesList wrapper">
                <h3>Seus jogos mais jogados:</h3>
                <GamesList />
            </div>
            <div className="aboutme wrapper">
                about me:
                <textarea disabled />
            </div>
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
