import { Container, ChatContainer, MatchesContainer } from './styles';
import { ChatList } from '../ChatList';
import { ChatBox } from '../ChatBox';
import { ChatboxProvider } from '../../../hooks/useChatbox';

export function ChatComponent() {
    return (
        <ChatboxProvider>
            <Container>
                <ChatContainer>
                    <ChatBox />
                </ChatContainer>
                <MatchesContainer>
                    <ChatList />
                </MatchesContainer>
            </Container>
        </ChatboxProvider>
    );
}
