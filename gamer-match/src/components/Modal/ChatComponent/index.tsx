import { Container, ChatContainer, MatchesContainer, ChatAnchor } from './styles';
import { ChatList } from '../ChatList';
import { ChatBox } from '../ChatBox';
import { ChatboxProvider, useChatbox } from '../../../hooks/useChatbox';
import { FiMessageCircle } from 'react-icons/fi';

export function ChatComponent() {
    const { isOpen, setIsOpenFunction } = useChatbox();

    function handleOnClick() {
        setIsOpenFunction(true);
    }

    return (
        <ChatboxProvider>
            {isOpen ? (
                <Container>
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
        </ChatboxProvider>
    );
}
