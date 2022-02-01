import styled from 'styled-components';

export const Container = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--color-text-in-primary);
    background: var(--color-primary);
    background: linear-gradient(180deg, #14171e 12.88%, #14171e 45.17%, #08497f 100%);
`;

export const Content = styled.div`
    max-width: 1100px;
    max-height: 800px;
    overflow: hidden;
    border-radius: 10px;

    background: #36393e;
    display: grid;
    grid-template-columns: 1fr 1fr;

    div.wrapperHero {
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const FormMain = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    padding: 0rem 5rem 5rem;
    width: 500px;

    div.wrapperLogin {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;

        button {
            width: 16rem;
            height: 4rem;
            border-radius: 0.8rem;
            font: 500 1.5rem Archivo;

            display: flex;
            align-items: center;
            justify-content: center;

            text-decoration: none;
            color: var(--color-button-text);
            background: #148dfd;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);

            transition: background-color 0.2s;

            &:first-child {
                background: purple;
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
            background: #36393e;
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
        border: 3px solid #89878a;
        font-size: 1.5rem;
    }

    .emailIcon {
        color: #89878a;
        position: absolute;
        left: 15px;
        font-size: 2.2rem;
    }
    .passwordIcon {
        color: #89878a;
        position: absolute;
        left: 15px;
        font-size: 2.2rem;
    }
`;
