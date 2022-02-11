import styled from 'styled-components';
import { darken } from 'polished';

interface Props {
    buttonType: 'blizzard' | 'steam' | 'epicGames';
}

const defaultConfigs = {
    blizzard: {
        background: '#009AE4',
    },
    steam: {
        background: '#1b2838',
    },
    epicGames: {
        background: '#000',
    },
};

export const Button = styled.button<Props>`
    width: 30rem;
    height: 5rem;
    border-radius: 0.8rem;
    font: 500 1.3rem Poppins;
    position: relative;

    text-decoration: none;
    color: white;
    background: ${(p) => defaultConfigs[p.buttonType as keyof typeof defaultConfigs].background};

    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 80px;

    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);

    transition: filter 0.2s;

    &:not(:last-child) {
        margin-bottom: 2rem;
    }

    &:hover {
        filter: brightness(0.8);
    }
`;

export const Icon = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 0;
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    height: 100%;
    width: 50px;

    .ic {
        font-size: 1.8rem;
    }
`;
