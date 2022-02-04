import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    height: 640px;
    width: 800px;
    right: 50px;
    bottom: 0;
    background-color: #141d2c;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 640px;
`;

export const ChatContainer = styled.div`
    height: 100%;
    border-right: 2px solid #343c4c;
    padding-right: 10px;
`;

export const MatchesContainer = styled.div`
    height: 100%;
    border-left: 2px solid #343c4c;
    padding-left: 10px;
`;
