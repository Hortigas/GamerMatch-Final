import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Profile/styles';
import Avatar from '../assets/UserPics/userpic1.jpg';
import Control from '../assets/control.svg';
import { MdModeEditOutline } from 'react-icons/md';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoIosAddCircle } from 'react-icons/io';

import Image from 'next/image';
import { LoginButton } from './../components/Profile/LoginButton/index';
import { AuthContext } from '../../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';

import AvatarEditor from 'react-avatar-editor';
import { ModalAddGame } from '../components/Profile/ModalAddGame';

type GameType = {
    gameName: string;
    timePlayed: number;
    gameCategory: string;
};

type GameListProps = {
    gameList: GameType[];
    handleRemove: (e: React.MouseEvent) => void;
    editMode: boolean;
};

export default function Profile() {
    const { user, gameList, setGameList } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleEditPerfil() {
        setEditMode(!editMode);
    }

    function handleRemove(e) {
        console.log(e.currentTarget.getAttribute('name'));
        const newGameList = gameList.filter((g) => g.gameName !== e.currentTarget.getAttribute('name'));
        setGameList(newGameList);
    }

    return (
        <Container>
            <ModalAddGame isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="profile wrapper">
                <div className="avatarWrapper">
                    <Image src={Avatar} alt="hero image Gamer match" width="180px" height="180px" className="avatar" />
                    {editMode ? <MdModeEditOutline className="editPerfil" /> : ''}

                    <div className="name">
                        <h2>{user?.username}</h2>
                        <h3>23 anos</h3>
                        <button onClick={handleEditPerfil}>{editMode ? 'salvar mudanças' : 'editar perfil'}</button>
                    </div>
                </div>
                <div className="buttons">
                    <LoginButton buttonType={'blizzard'} />
                    <LoginButton buttonType={'steam'} />
                    <LoginButton buttonType={'epicGames'} />
                </div>
            </div>

            <div className="gameList wrapper">
                <h3>Seus jogos mais jogados: {editMode ? <IoIosAddCircle className="addIcon" onClick={handleOpenModal} /> : ''}</h3>
                <GameList handleRemove={handleRemove} editMode={editMode} gameList={gameList} />
            </div>
            <div className="aboutme wrapper">
                sobre mim:
                <textarea disabled={!editMode} placeholder={editMode ? 'escreva algo sobre você' : ''} style={editMode ? { background: '#14171E90' } : {}} />
            </div>
        </Container>
    );
}

function GameList({ handleRemove, editMode, gameList }: GameListProps) {
    useEffect(() => {}, [gameList]);

    return (
        <UL>
            {gameList?.map((i) => (
                <li key={i.gameName}>
                    <div className="gameIcon">
                        <Image src={Control} width="40px" />
                    </div>
                    {i.gameName} <span> ({i.timePlayed} horas)</span>
                    {editMode ? <IoIosRemoveCircle className="removeIcon" onClick={handleRemove} name={i.gameName} /> : ''}
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
