import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--color-text-in-primary);
    background: var(--color-primary);
    background: #14171e;
`;

export const Content = styled.div`
    max-width: 1100px;
    max-height: 900px;
    overflow: hidden;
    border-radius: 10px;

    background: #23252b;
    display: flex;
    align-items: center;

    .wrapperHero {
        flex: 2;
        height: 100%;
        background-color: #0c111d;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        .hero {
        }
    }

    @media (max-width: 1000px) {
        max-height: none;
        height: 100%;
        width: 100%;
    }

    @media (max-width: 600px) {
        div.wrapperHero {
            visibility: hidden;
            position: absolute;
        }
    }
`;

export const Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 0rem 5rem 5rem;
    height: 100%;

    form {
        width: 100%;
    }

    div.wrapperLogin {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;

        button {
            flex: 1;
            height: 4rem;
            border-radius: 0.8rem;
            font: 500 1.5rem Archivo;

            display: flex;
            align-items: center;
            justify-content: center;

            text-decoration: none;
            color: white;
            background: #148dfd;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);

            transition: filter 0.2s;

            & + button {
                margin-left: 2rem;
            }

            &:hover {
                filter: brightness(0.8);
            }

            &:first-child {
                background: #89878a;
            }
        }
    }

    div.divider {
        width: 100%;
        height: 2px;
        background: #89878a;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            text-align: center;
            width: 40px;
            background: #23252b;
            color: #89878a;
            font-size: 1.1rem;
            font-weight: bold;
        }
    }
`;

export const InputWrapper = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0) !important;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    input {
        width: 100%;
        padding: 10px;
        padding-left: 50px;
        display: inline-block;
        border: none;
        border-radius: 0.8rem;
        background: rgba(255, 255, 255, 0);
        color: rgba(255, 255, 255, 0.7);
        border: 1px solid #89878a;
        font-size: 1.5rem;
        font-weight: 400;
    }

    .Icon {
        color: #89878a;
        position: absolute;
        left: 15px;
        font-size: 2.2rem;
    }
`;
