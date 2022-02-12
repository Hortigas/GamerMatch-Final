import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    /* Scroll */
    &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #0c4b7b;
        border-radius: 10px;
    }
`;

type anchorProps = {
    focus: boolean;
};

export const ChatItemContainer = styled.a<anchorProps>`
    height: 100px;
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #343c4c;
    display: grid;
    grid-template-areas:
        'avatar h3 span'
        'avatar h4 h4';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 80px 1fr 1fr;
    background-color: ${(props) => (props.focus ? lighten(0.05, '#222328') : 'transparent')};

    transition: background-color 0.2s;
    &:hover {
        background-color: ${lighten(0.04, '#222328')};
    }

    .avatar {
        position: relative;
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

        .status {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid #141d2c;
            right: 8px;
            bottom: 8px;
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
