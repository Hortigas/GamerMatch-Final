import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1600px;
    margin: auto auto 30px;
    padding: 0px 16px;
    color: #c2dedf;

    display: flex;
    flex-direction: column;
    align-items: center;

    .wrapper {
        background-color: #23252b;
        width: 100%;
        padding: 40px;
        border-radius: 4px;
        margin-bottom: 40px;
    }

    .profile {
        display: flex;
        flex-direction: rows;
        align-items: center;
        justify-content: space-between;
        background-image: url('https://cdn.wallpapersafari.com/53/92/qZjSsf.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        .avatarWrapper {
            position: relative;
            display: flex;
            align-items: center;

            .avatar {
                border-radius: 50%;
            }

            .editPerfil {
                position: absolute;
                top: 5px;
                left: 140px;
                height: 40px;
                width: 40px;
                padding: 5px;
                background-color: #148dfd;
                border-radius: 50%;
            }
        }

        .name {
            margin-left: 30px;
            background: RGBA(0, 0, 0, 0.6);
            padding: 5px 20px;
            border-radius: 10px;
            display: grid;
            grid-template-areas:
                'h2 b'
                'h3 b';

            h2 {
                grid-area: h2;
                color: white;
                font-weight: 500;
                font-size: 2.5rem;
            }

            h3 {
                grid-area: h3;
                font-weight: 400;
            }

            button {
                grid-area: b;
                height: 35px;
                margin: auto;
                margin-left: 20px;
                padding: 10px 15px;
                text-align: center;
                line-height: 1rem;
                background-color: #148dfd;
                color: white;
                border-radius: 30px;
            }
        }
    }

    .gameList {
        h3 {
            font-weight: 500;
            font-size: 2.2rem;
            margin-bottom: 20px;
            color: white;
            align-items: center;
            display: flex;

            .addIcon {
                color: #148dfd;
                height: 3rem;
                width: 3rem;
                margin-left: 5px;
            }
        }
    }

    .aboutme {
        margin-bottom: 100px;
        font-weight: 500;
        font-size: 2.2rem;
        color: white;

        textarea {
            padding: 5px 10px;
            min-height: 100px;
            font-size: 1.8rem;
            margin-top: 10px;
            display: block;
            background-color: transparent;
            width: 100%;
            overflow-wrap: break-word;
            resize: none;
            color: gray;
        }
    }

    @media (max-width: 1000px) {
        .profile {
            flex-direction: column;
        }

        .avatarWrapper {
            display: flex;
            flex-direction: column;

            .name {
                margin: 0;
                margin-top: 30px;
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 20px;

                h3 {
                    margin-bottom: 10px;
                }
            }
        }

        .buttons {
            margin-top: 50px;
        }
    }
`;

export const UL = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    li {
        display: flex;
        align-items: center;
        padding: 15px;
        list-style-type: none;
        color: white;

            .removeIcon {
                color: #ee3e54;
                margin-left: 5px;
                width: 2.2rem;
            height: 2.2rem;
            }
        }
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

    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;
//#23252b
