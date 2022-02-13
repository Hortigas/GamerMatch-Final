import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { Home } from '../components/Home/styles';

const base_url = "https://api.rawg.io/api/";
const apiKey = process.env.NEXT_PUBLIC_GAMES_API_RAWG as string;
const query_games = `games?key=${apiKey}&search=`;
const category_games = `games?key=${apiKey}&genres=`;

export default function Landing() {
    const { user, signOut } = useContext(AuthContext);

    async function searchGameList() { //pesquisa jogo pelo nome
        const name = document.querySelector('input').value;
        const searchGame = game_name => `${base_url}${query_games}${game_name}&page_size=20`;
        let response = await fetch(searchGame(name));
        let data = await response.json();
        console.log(data);
    }

    async function searchGameByCategory() { //pesquisa jogo pela categoria.. retorna max 20
        const categoria = document.getElementById("categorias").value;
        const searchCategory = genre_id => `${base_url}${category_games}${genre_id}&page_size=20`;
        let response = await fetch(searchCategory(categoria));
        let data = await response.json();
        console.log(data);
    }

    return (
        <Home>
            <h1>Hello {user?.email}</h1>
            <button onClick={signOut}>deslogar</button>
            <br />
            <input type="text" placeholder="Enter text" />
            <button onClick={searchGameList}>buscar</button>
            <select id="categorias" onChange={searchGameByCategory}>
                <option value="4">Ação</option>
                <option value="3">Aventura</option>
                <option value="5">RPG</option>
                <option value="10">Estratégia</option>
                <option value="2">Tiro</option>
                <option value="40">Casual</option>
                <option value="7">Puzzle</option>
                <option value="51">Indie</option>
                <option value="11">Arcade</option>
                <option value="14">Simulação</option>
                <option value="10">Plataforma</option>
                <option value="1">Corrida</option>
                <option value="59">Multiplayer massivo</option>
                <option value="15">Esportes</option>
                <option value="6">Luta</option>
                <option value="19">Família</option>
                <option value="28">Tabuleiro</option>
                <option value="34">Educacional</option>
                <option value="17">Carta</option>
            </select>
        </Home>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});