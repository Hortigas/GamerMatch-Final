import styled from 'styled-components';

export const Container = styled.div`
    height: 90px;
    width: 100%;
    max-width: 1600px;
    margin: auto;
    padding: 0px 16px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .perfilMenuWrapper {
        position: relative;
    }

    a.navbarPerfil {
        color: #c4c4c4;
        margin-right: 10px;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        cursor: pointer;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(1.5);
        }

        .navbarArrow {
            height: 2rem;
            width: 2rem;
            color: #c4c4c4;
        }
    }
`;
