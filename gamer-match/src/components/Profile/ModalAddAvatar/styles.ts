import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const FormContainer = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    .IconClose {
        position: absolute;
        color: #506e89;
        right: 5px;
        top: 5px;
        height: 30px;
        width: 30px;
        cursor: pointer;
    }

    h2 {
        color: white;
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 1rem;
        text-align: center;
    }

    input,
    select,
    button {
        width: 100%;
        padding: 0 12px;
        font-size: 1.5rem;
        font-weight: 400;
        height: 40px;
        font-size: 16px;
        line-height: 24px;
        border-radius: 4px;
        vertical-align: middle;
    }

    input,
    select {
        display: inline-block;
        line-height: 24px;
        border: 1px solid rgba(255, 255, 255, 0.36);
        background-color: #171920;
        color: #f0f0f0;
        margin-bottom: 25px;
    }

    select {
        cursor: pointer;
    }

    button {
        background-color: #148dfd;
        color: #ffffff;
        font-weight: 500;
    }

    span {
        margin: 0px 5px 5px 5px;
        display: block;
        color: #f0f0f0;
    }
`;

export const Container = styled.div`
    .IconClose {
        position: absolute;
        color: #506e89;
        right: 5px;
        top: 5px;
        height: 30px;
        width: 30px;
        cursor: pointer;
    }

    h2 {
        color: white;
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 1rem;
        text-align: center;
    }

    input,
    select,
    button {
        width: 100%;
        padding: 0 12px;
        font-size: 1.5rem;
        font-weight: 400;
        height: 40px;
        font-size: 16px;
        line-height: 24px;
        border-radius: 4px;
        vertical-align: middle;
    }

    input,
    select {
        display: inline-block;
        line-height: 24px;
        border: 1px solid rgba(255, 255, 255, 0.36);
        background-color: #171920;
        color: #f0f0f0;
        margin-bottom: 25px;
    }

    select {
        cursor: pointer;
    }

    button {
        background-color: #148dfd;
        color: #ffffff;
        font-weight: 500;
    }

    span {
        margin: 0px 5px 5px 5px;
        display: block;
        color: #f0f0f0;
    }
`;
