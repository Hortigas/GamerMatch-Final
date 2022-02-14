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

    .avatarEditor {
        position: fixed;
    }

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

        .infoWrapper {
            display: flex;
            align-items: center;

            .avatarWrapper {
                position: relative;

                .avatar {
                    border-radius: 50%;
                }

                .editAvatar {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    height: 40px;
                    width: 40px;
                    padding: 5px;
                    background-color: #148dfd;
                    border-radius: 50%;
                    cursor: pointer;
                }
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
                cursor: pointer;
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

    @media (max-width: 900px) {
        .profile {
            flex-direction: column;
        }

        .wrapper {
            padding: 20px;
        }

        .infoWrapper {
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
            color: var(--red);
            margin-left: 5px;
            width: 2.2rem;
            height: 2.2rem;
            cursor: pointer;
        }

        .gameIcon {
            display: flex;
            align-items: center;
            background-image: url#14171e;
            margin-right: 15px;
            cursor: pointer;
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
