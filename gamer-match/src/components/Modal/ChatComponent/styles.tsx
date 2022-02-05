import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    height: 640px;
    width: 800px;
    right: 50px;
    bottom: 0;
    background-color: #141d2c;
    padding: 10px;
    display: flex;
`;

export const ChatContainer = styled.div`
    width: 50%;
    border-right: 2px solid #343c4c;
    padding-right: 10px;
`;

export const MatchesContainer = styled.div`
    width: 50%;
    border-left: 2px solid #343c4c;
    padding-left: 10px;
`;

export const ChatAnchor = styled.a`
    position: absolute;
    bottom: 50px;
    right: 5vw;
    width: 80px;
    height: 80px;
    background: #148dfd;
    border-radius: 50%;
    cursor: pointer;

    .IconMessage {
        width: 80px;
        height: 80px;
        padding: 20px;
        color: White;
    }
`;
