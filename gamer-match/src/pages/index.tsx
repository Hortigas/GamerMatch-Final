import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Home/styles';
import Image from 'next/image';
import Control from '../assets/control.svg';
import Logo from '../assets/logoGamerMatchNTNL.png';
import { api } from '../services/apiClient';
import Avatar from './../assets/UserPics/userpic1.jpg';
import { toast } from 'react-toastify';

type GameType = {
    gameName: string;
    timePlayed: number;
    gameCategory: string;
};

type GameListProps = {
    gameList: { games: GameType[] };
};

const base_url = 'https://api.rawg.io/api/';
const apiKey = process.env.NEXT_PUBLIC_GAMES_API_RAWG as string;
const query_games = `games?key=${apiKey}&search=`;
const category_games = `games?key=${apiKey}&genres=`;

export default function Landing() {
    const { user, gameList, convertToAge, matches, setMatches } = useContext(AuthContext);
    const [newMatches, setNewMatches] = useState(null);

    useEffect(() => {
        if (!!user) findMatches();
    }, [matches]);

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
        try {
            const newM = await api.get(`/findMatch/${user.userId}`);
            setNewMatches(newM.data);
        } catch (err) {
            console.log(err);
        }
    }

    type Match = {
        matchId: number;
        userId: number;
        username: string;
        avatar: string | StaticImageData;
        messages: any[];
    };

    async function handleMatch(matchUser: any) {
        try {
            const response = await api.post(`/matches/create`, { user_id_1: user.userId, user_id_2: matchUser.id });
            const { id } = response.data;
            const newMatch = { matchId: id, userId: matchUser.id, username: matchUser.user_name, avatar: matchUser.user_photo ?? Avatar, messages: [] } as Match;
            console.log(newMatch);
            setMatches([...matches, newMatch]);
            toast.success('Match realizado com sucesso!');
        } catch (err) {
            console.log(err);
        }
    }

    if (!newMatches) return <></>;

    return (
        <Container>
            <div className="wrapper">
                <div className="mainUL">
                    {newMatches.map((nm) => (
                        <div className="mainLI" key={nm.id}>
                            <Image src={nm?.user.user_photo ?? Avatar} alt="Avatar" width="180px" height="180px" className="avatar" />
                            <div className="perfil">
                                <h2>{nm.user.user_name}</h2>
                                <h3>{convertToAge(nm.user.birth_date)} anos</h3>
                                <span>{nm.user.user_aboutme}</span>
                            </div>
                            <GameList gameList={nm.games} />
                            <div className="match">
                                <Image
                                    src={Logo}
                                    width="120px"
                                    height="120px"
                                    className="matchButton"
                                    onClick={() => {
                                        handleMatch(nm.user);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

function GameList({ gameList }: GameListProps) {
    if (!gameList) return <ul></ul>;

    return (
        <UL>
            {gameList.games
                ?.sort((a, b) => {
                    return b.timePlayed - a.timePlayed;
                })
                .map((g, i) => {
                    if (i <= 4)
                        return (
                            <li key={i}>
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
