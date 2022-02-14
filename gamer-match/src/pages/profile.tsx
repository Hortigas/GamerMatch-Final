import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Profile/styles';
import Control from '../assets/control.svg';
import { MdModeEditOutline } from 'react-icons/md';
import { IoIosRemoveCircle } from 'react-icons/io';
import { IoIosAddCircle } from 'react-icons/io';

import Image from 'next/image';
import { LoginButton } from './../components/Profile/LoginButton/index';
import { AuthContext } from '../../contexts/AuthContext';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { ModalAddGame } from '../components/Profile/ModalAddGame';
import { ModalAddAvatar } from '../components/Profile/ModalAddAvatar';

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
    const { user, setUser, gameList, setGameList, updateProfile, convertToAge } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [modalAddGameIsOpen, setModalAddGameIsOpen] = useState(false);
    const [modalAddAvatarIsOpen, setModalAddAvatarIsOpen] = useState(false);

    const aboutmeRef = useRef(null);

    function handleOpenModalAddAvatar() {
        setModalAddAvatarIsOpen(true);
    }

    function handleOpenModalAddGame() {
        setModalAddGameIsOpen(true);
    }

    function handleEditPerfil() {
        if (editMode) {
            const newUser = user;
            newUser.aboutme = aboutmeRef.current.value;
            setUser(newUser);
            updateProfile();
        } else {
        }

        setEditMode(!editMode);
    }

    function handleRemove(e) {
        console.log(e.currentTarget.getAttribute('name'));
        const newGameList = gameList.filter((g) => g.gameName !== e.currentTarget.getAttribute('name'));
        setGameList(newGameList);
    }

    if (!user) return <></>;

    return (
        <Container>
            <ModalAddAvatar isOpen={modalAddAvatarIsOpen} setIsOpen={setModalAddAvatarIsOpen} />
            <ModalAddGame isOpen={modalAddGameIsOpen} setIsOpen={setModalAddGameIsOpen} />
            <div className="profile wrapper">
                <div className="infoWrapper">
                    <div className="avatarWrapper">
                        <Image src={user.avatar} alt="Avatar" width="180px" height="180px" className="avatar" />
                        {editMode ? <MdModeEditOutline className="editAvatar" onClick={handleOpenModalAddAvatar} /> : ''}
                    </div>
                    <div className="name">
                        <h2>{user?.username}</h2>
                        <h3>{convertToAge(user.birth)}</h3>
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
                <h3>Seus jogos mais jogados: {editMode ? <IoIosAddCircle className="addIcon" onClick={handleOpenModalAddGame} /> : ''}</h3>
                <GameList handleRemove={handleRemove} editMode={editMode} gameList={gameList} />
            </div>
            <div className="aboutme wrapper">
                sobre mim:
                <textarea
                    maxLength={255}
                    ref={aboutmeRef}
                    defaultValue={user.aboutme}
                    disabled={!editMode}
                    placeholder={editMode ? 'escreva algo sobre você' : ''}
                    style={editMode ? { background: '#14171E90' } : {}}
                />
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
