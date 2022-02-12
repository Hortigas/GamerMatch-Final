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

    async function searchGameByCategory() { //pesquisa jogo pela categoria
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
                <option value="4">acao</option>
                <option value="51">indie</option>
                <option value="14">simulacao</option>
            </select>
        </Home>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});