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
        .avatar {
            border-radius: 50%;
        }
    }

    .aboutme {
        min-height: 150px;
    }

    .gamesList {
        h3 {
            font-weight: 500;
            font-size: 2.2rem;
            margin-bottom: 20px;
            color: gray;
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
