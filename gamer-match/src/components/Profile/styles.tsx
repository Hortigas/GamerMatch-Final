import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1600px;
    margin: auto auto 30px;
    padding: 16px;
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

    .gamesList {
        h3 {
            font-weight: 500;
        }
    }
`;

//#23252b
