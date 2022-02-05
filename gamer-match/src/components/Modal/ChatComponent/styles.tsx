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

export const Header = styled.div`
    width: 100%;
    height: 25px;
    padding: 5px 5px 0px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .IconClose {
        height: 100%;
        width: auto;

        color: #506e89;
    }
`;

export const ChatContainer = styled.div`
    margin-top: 25px;
    width: 50%;
    border-right: 2px solid #343c4c;
    padding-right: 10px;
`;

export const MatchesContainer = styled.div`
    margin-top: 25px;
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
