import { Container, ChatContainer, MatchesContainer } from './styles';
import { ChatList } from '../ChatList';
import { ChatBox } from '../ChatBox';

export function ChatComponent() {
    return (
        <Container>
            <ChatContainer>
                <ChatBox />
            </ChatContainer>
            <MatchesContainer>
                <ChatList />
            </MatchesContainer>
        </Container>
    );
}
