import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1600px;
    margin: auto auto 30px;
    padding: 0px 16px;
    color: #c2dedf;

    .wrapper {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 40px;
    }

    li.mainLI {
        background-color: #23252b;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;

        list-style-type: none;
        color: white;
        margin-bottom: 30px;

        .avatar {
            border-radius: 50%;
        }

        .perfil {
            h2 {
                color: white;
                font-weight: 500;
                font-size: 2.5rem;
            }
            h3 {
                font-weight: 400;
            }
        }

        a {
            background-color: #148dfd;
            border-radius: 50%;
            padding: 10px;
            margin-right: 40px;
        }
    }
`;

export const UL = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    li {
        display: flex;
        align-items: center;
        padding: 5px;
        list-style-type: none;
        color: white;

        .gameIcon {
            display: flex;
            align-items: center;
            background-image: url#14171e;
            margin-right: 15px;
        }

        span {
            color: gray;
            margin-left: 0.5rem;
        }
    }
`;
