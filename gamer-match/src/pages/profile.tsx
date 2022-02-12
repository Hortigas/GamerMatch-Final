import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Profile/styles';
import Image from 'next/image';
import Avatar from '../assets/UserPics/userpic1.jpg';
import Control from '../assets/control.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { LoginButton } from './../components/Profile/LoginButton/index';
import { MdModeEditOutline } from 'react-icons/md';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoIosAddCircle } from 'react-icons/io';

import AvatarEditor from 'react-avatar-editor';

type GameListProps = {
    handleRemove: () => void;
};

export default function Profile() {
    const { user } = useContext(AuthContext);

    function handleEditPerfil() {}

    function handleRemove() {}

    return (
        <Container>
            <div className="profile wrapper">
                <div className="avatarWrapper">
                    <Image src={Avatar} alt="hero image Gamer match" width="180px" height="180px" className="avatar" />
                    <MdModeEditOutline className="editPerfil" onClick={handleEditPerfil} />

                    <div className="name">
                        <h2>{user?.username}</h2>
                        <h3>23 anos</h3>
                        <button>editar perfil</button>
                    </div>
                </div>
                <div className="buttons">
                    <LoginButton buttonType={'blizzard'} />
                    <LoginButton buttonType={'steam'} />
                    <LoginButton buttonType={'epicGames'} />
                </div>
            </div>

            <div className="GameList wrapper">
                <h3>
                    Seus jogos mais jogados: <IoIosAddCircle />
                </h3>
                <GameList handleRemove={handleRemove} />
            </div>
            <div className="aboutme wrapper">
                about me:
                <textarea disabled />
            </div>
        </Container>
    );
}

function GameList({ handleRemove }: GameListProps) {
    const { gameList } = useContext(AuthContext);

    return (
        <UL>
            {gameList?.map((i) => (
                <li key={i.gameName}>
                    <div className="gameIcon">
                        <Image src={Control} width="40px" />
                    </div>
                    {i.gameName} <span> ({i.timePlayed} horas)</span>
                    <IoIosRemoveCircle className="removeIcon" onClick={handleRemove} />
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
