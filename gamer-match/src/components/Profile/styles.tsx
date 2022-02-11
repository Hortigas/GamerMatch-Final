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

        .info {
            display: flex;
            align-items: center;
            position: relative;

            .name {
                margin-left: 50px;
            }

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

            h2 {
                color: white;
                font-weight: 500;
                font-size: 2.5rem;
            }

            h3 {
                font-weight: 400;
            }
        }
    }

    .gamesList {
        h3 {
            font-weight: 500;
            font-size: 2.2rem;
            margin-bottom: 20px;
            color: white;
        }
    }

    .aboutme {
        min-height: 150px;
        margin-bottom: 100px;
        font-weight: 500;
        font-size: 2.2rem;
        margin-bottom: 20px;
        color: white;

        textarea {
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

            .buttons {
                margin-top: 50px;
            }

            .info {
                flex-direction: column;
                text-align: center;

                h2 {
                    margin-top: 30px;
                }
            }
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
