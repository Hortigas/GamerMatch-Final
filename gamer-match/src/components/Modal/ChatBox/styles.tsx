import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const SelectedUser = styled.div`
    height: 80px;
    width: 100%;
    border-bottom: 2px solid #343c4c;
    display: grid;
    grid-template-columns: 80px 1fr;

    .avatar {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

        .avatarImg {
            border-radius: 50%;
            object-fit: cover;
        }
    }

    h3 {
        margin: auto 0 auto 1.5rem;
        color: #f0f0f0;
        font-weight: 500;
        font-size: 2.2rem;
    }
`;

export const ChatItemContainer = styled.div`
    height: 100px;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #343c4c;
    display: grid;
    grid-template-areas:
        'avatar h3 span'
        'avatar h4 h4';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 80px 1fr 1fr;

    transition: background-color 0.2s;
    &:hover {
        background-color: ${lighten(0.03, '#141d2c')};
    }

    .avatar {
        grid-area: avatar;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

        .avatarImg {
            border-radius: 50%;
            object-fit: cover;
        }
    }

    h3 {
        grid-area: h3;
        margin: auto 0 auto 1.5rem;
        color: #f0f0f0;
        font-weight: 500;
    }

    h4 {
        grid-area: h4;
        margin: auto 0 auto 1.5rem;
        color: #f0f0f0;
        font-weight: 400;
    }

    span {
        grid-area: span;
        margin: auto 0 auto 0;
        text-align: right;
        color: #f0f0f0;
        font-weight: 400;
    }
`;

export const MessageInput = styled.input`
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    border: 3px solid #506e89;
    border-radius: 20px;
    background-color: transparent;
    padding: 0px 15px;
    color: white;
`;

export const Conversations = styled.main`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    /* Scroll */
    &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }
    &::-webkit-scrollbar-track {
        margin-top: 5px;
        background-color: transparent;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #89878a;
        border-radius: 10px;
    }
    padding: 10px 10px;
`;

export const BalloonWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 20px;
`;

export const Balloon = styled.div`
    position: relative;

    border-radius: 15px;
    padding: 0.8rem 1.2rem 2.2rem 1.2rem;
    max-width: 90%;
    min-width: 20%;
    color: white;

    &.right {
        background-color: #08497f;
        margin-left: auto;

        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            border-top: 25px solid #08497f;
            right: 0;
            border-left: 30px solid transparent;
            z-index: -1;
        }
    }

    &.left {
        background-color: #36393e;
        margin-right: auto;

        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            border-top: 25px solid #36393e;
            left: 0;
            border-right: 30px solid transparent;
            z-index: -1;
        }
    }

    .message {
        font-weight: 400;
        word-wrap: break-word;
    }

    .date {
        position: absolute;
        right: 1.5rem;
        bottom: 0;
        text-align: right;
        font-weight: 400;
        font-size: 85%;
        color: #c0c0c0;
    }
`;
