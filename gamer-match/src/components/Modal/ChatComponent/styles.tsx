import styled from 'styled-components';

export const ContainerMatches = styled.div`
    position: fixed;
    max-height: 100%;
    height: 640px;
    width: 400px;
    right: 5vw;
    bottom: 0;
    background-color: #222328;

    display: flex;
    flex-direction: column;

    .matchesContainer {
    }

    @media (max-width: 600px) {
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }
`;

export const ContainerChat = styled.div`
    position: fixed;
    max-height: 100%;
    height: 640px;
    width: 400px;
    right: calc(400px + 5vw);
    bottom: 0;
    background-color: #222328;
    padding: 10px;
    display: flex;

    .closeChat {
        position: absolute;
        color: #506e89;
        right: 20px;
        top: 5px;
        height: 30px;
        width: 30px;
    }

    .chatContainer {
        padding-right: 10px;
        border-right: 3px solid #506e89;
        width: 100%;
    }

    @media (max-width: 1000px) {
        right: calc(5vw);

        .closeChat {
            right: 5px;
        }

        .chatContainer {
            padding-right: 0;
            border-right: none;
        }
    }

    @media (max-width: 600px) {
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }
`;

export const Header = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    display: flex;
    border-bottom: 2px solid #506e89;

    .perfil {
        display: flex;
        align-items: center;

        h1 {
            margin-left: 25px;
            font-size: 2.5rem;
            font-weight: 500;
            color: #6ea8de;
        }

        .avatar {
            border-radius: 50%;
        }
    }

    .IconClose {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 30px;
        height: 30px;
        color: #506e89;
        cursor: pointer;
    }
`;

export const matchesContainer = styled.div`
    margin-top: 25px;
    width: 50%;
    border-left: 2px solid #89878a;
`;

export const ChatAnchor = styled.a`
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 80px;
    height: 80px;
    background: #6ea8de;
    border-radius: 50%;
    cursor: pointer;

    .IconMessage {
        width: 80px;
        height: 80px;
        padding: 20px;
        color: White;
    }
`;
