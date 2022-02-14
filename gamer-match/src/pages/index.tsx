import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Home/styles';
import Image from 'next/image';
import Control from '../assets/control.svg';
import Logo from '../assets/logoGamerMatchNTNL.png';
import converter from 'date-and-time';
import { api } from '../services/apiClient';

type GameType = {
    gameName: string;
    timePlayed: number;
    gameCategory: string;
};

type GameListProps = {
    gameList: GameType[];
};

const base_url = 'https://api.rawg.io/api/';
const apiKey = process.env.NEXT_PUBLIC_GAMES_API_RAWG as string;
const query_games = `games?key=${apiKey}&search=`;
const category_games = `games?key=${apiKey}&genres=`;

export default function Landing() {
    const { user, gameList, convertToAge, matches } = useContext(AuthContext);
    const [newMatches, setNewMatches] = useState(null);

    useEffect(() => {
        findMatches();
    }, []);

    async function searchGameList() {
        //pesquisa jogo pelo nome
        const name = document.querySelector('input').value;
        const searchGame = (game_name) => `${base_url}${query_games}${game_name}&page_size=20`;
        let response = await fetch(searchGame(name));
        let data = await response.json();
        console.log(data);
    }

    async function searchGameByCategory() {
        //pesquisa jogo pela categoria.. retorna max 20
        const categoria = document.getElementById('categorias').value;
        const searchCategory = (genre_id) => `${base_url}${category_games}${genre_id}&page_size=20`;
        let response = await fetch(searchCategory(categoria));
        let data = await response.json();
        console.log(data);
    }

    async function findMatches() {
        const usersId = matches.map((m) => m.userId);
        console.log(usersId);
        try {
            setNewMatches(await api.get(`/findMatch/${user.userId}`, { params: { users: usersId } }));
        } catch (err) {
            console.log(err);
        }
    }

    if (!user || newMatches) return <></>;

    return (
        <Container>
            <div className="wrapper">
                <ul className="mainUL">
                    <li className="mainLI">
                        <Image src={user.avatar} alt="Avatar" width="180px" height="180px" className="avatar" />
                        <div className="perfil">
                            <h2>{user.username}</h2>
                            <h3>{convertToAge(user.birth)} anos</h3>
                        </div>
                        <GameList gameList={gameList} />
                        <a href="">
                            <Image src={Logo} width="120px" height="120px" />
                        </a>
                    </li>
                    <li className="mainLI">
                        <Image src={user.avatar} alt="Avatar" width="180px" height="180px" className="avatar" />
                        <div className="perfil">
                            <h2>{user.username}</h2>
                            <span>{convertToAge(user.birth)} anos</span>
                        </div>
                        <GameList gameList={gameList} />
                        <a>
                            <Image src={Logo} width="120px" height="120px" />
                        </a>
                    </li>
                </ul>
            </div>
        </Container>
    );
}

function GameList({ gameList }: GameListProps) {
    return (
        <UL>
            {gameList?.map((g, i) => {
                if (i <= 4)
                    return (
                        <li key={g.gameName}>
                            <div className="gameIcon">
                                <Image src={Control} width="40px" />
                            </div>
                            {g.gameName} <span> ({g.timePlayed} horas)</span>
                        </li>
                    );
            })}
        </UL>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});

/*
            <h1>Hello {user?.email}</h1>
            <br />
            <input type="text" placeholder="Enter text" />
            <button onClick={searchGameList}>buscar</button>
            <select id="categorias" onChange={searchGameByCategory}>
                {categories.map((c) => (
                    <option value={c.id}>{c.name}</option>
                ))}
            </select>
*/
