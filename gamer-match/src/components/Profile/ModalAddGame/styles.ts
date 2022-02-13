import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
    .IconClose {
        position: absolute;
        color: #506e89;
        right: 5px;
        top: 5px;
        height: 30px;
        width: 30px;
    }

    h2 {
        color: white;
        font-size: 2.5rem;
        font-weight: 500;
        margin-bottom: 2rem;
        text-align: center;
    }

    input {
        width: 100%;
        padding: 0 2rem;
        height: 5rem;
        border-radius: 10px;
        border: 2px solid gray;
        background: #1a1c23;
        font-weight: 400;
        font-size: 2rem;
        color: gray;

        &:focus {
            outline: none;
        }

        & + input {
            margin-top: 20px;
        }
    }

    select {
        width: 100%;
        padding: 0 2rem;
        height: 5rem;
        border-radius: 10px;
        border: 2px solid gray;
        background: #1a1c23;
        font-weight: 400;
        font-size: 2rem;
        color: gray;
        margin-top: 20px;

        &:focus {
            outline: none;
        }
    }

    button[type='submit'] {
        width: 100%;
        padding: 10px 15px;
        height: 4rem;
        background: #148dfd;
        color: white;
        border-radius: 0.25rem;
        border: 0;
        margin-top: 20px;
        text-align: center;
        line-height: 1rem;
        border-radius: 30px;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;
