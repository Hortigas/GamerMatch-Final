import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
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
