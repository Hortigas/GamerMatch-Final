import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 30px;
    right: 3px;
    background-color: #1a1c23;
    border: 1px solid #ffffff0f;
    border-top: 2px solid #ffffff0f;
    border-radius: 4px;
    color: #c4c4c4;
    z-index: 2;

    &:after {
        content: '';
        position: absolute;
        top: -12px;
        right: 10px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 10px solid #ffffff0f;
    }

    .perfil {
        width: 286px;
        padding: 24px;
        border-bottom: 1px solid #ffffff0f;

        h5 {
            color: #f0f0f0;
            font-size: 1.8rem;
            font-weight: 500;
        }

        span {
            font-size: 1.4rem;
            font-weight: 400;
        }
    }

    .nav {
        width: 286px;
        padding: 24px;
        display: flex;
        flex-direction: column;

        a {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            border-radius: 5px;
            cursor: pointer;

            height: 50px;
            transition: background 0.2s;

            &:hover {
                background: #292b33;
            }

            .navIcon {
                margin: 0px 10px;
            }
        }
    }
`;
