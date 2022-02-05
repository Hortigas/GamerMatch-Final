import { Container, ChatContainer, MatchesContainer, ChatAnchor, Header } from './styles';
import { ChatList } from '../ChatList';
import { ChatBox } from '../ChatBox';
import { FiMessageCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { useChatbox } from '../../../hooks/useChatbox';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useContext } from 'react';

export function ChatComponent() {
    const { isOpen, setIsOpenFunction } = useChatbox();
    const { user } = useContext(AuthContext);

    function handleOnClick() {
        setIsOpenFunction(!isOpen);
    }

    if (!user) return <></>;

    return (
        <>
            {isOpen ? (
                <Container>
                    <Header>
                        <AiOutlineClose className="IconClose" onClick={handleOnClick} />
                    </Header>
                    <ChatContainer>
                        <ChatBox />
                    </ChatContainer>
                    <MatchesContainer>
                        <ChatList />
                    </MatchesContainer>
                </Container>
            ) : (
                <ChatAnchor onClick={handleOnClick}>
                    <FiMessageCircle className="IconMessage" />
                </ChatAnchor>
            )}
        </>
    );
}
