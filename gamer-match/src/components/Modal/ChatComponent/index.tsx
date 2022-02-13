import { ContainerMatches, ContainerChat, ChatAnchor, Header } from './styles';
import { FiMessageCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

import { useChatbox } from '../../../hooks/useChatbox';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useContext } from 'react';
import { ChatList } from '../ChatList';
import { ChatBox } from '../ChatBox';

export function ChatComponent() {
    const { isOpen, setIsOpenFunction } = useChatbox();
    const { user } = useContext(AuthContext);
    const { currChat, setCurrentChat } = useChatbox();

    function handleOnClick() {
        setIsOpenFunction(!isOpen);
    }

    function handleClose() {
        setCurrentChat(-1);
    }

    if (!user) return <></>;

    return (
        <>
            {isOpen ? (
                <>
                    <ContainerMatches>
                        <Header>
                            <AiOutlineClose className="IconClose" onClick={handleOnClick} />
                            <div className="perfil">
                                <Image src={user.avatar} alt="hero image Gamer match" width="90px" height="90px" className="avatar" />
                                <h1>{user.username}</h1>
                            </div>
                        </Header>
                        <ChatList className="matchesContainer" />
                    </ContainerMatches>
                    {!!currChat ? (
                        <ContainerChat>
                            <AiOutlineArrowRight className="closeChat" onClick={handleClose} />
                            <ChatBox className="chatContainer" />
                        </ContainerChat>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <ChatAnchor onClick={handleOnClick}>
                    <FiMessageCircle className="IconMessage" />
                </ChatAnchor>
            )}
        </>
    );
}
