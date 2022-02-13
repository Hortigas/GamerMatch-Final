import { Container } from './styles';
import { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from '../../../../contexts/AuthContext';

import AvatarEditor from 'react-avatar-editor';

interface ModalAddGameProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export function ModalAddAvatar({ isOpen, setIsOpen }: ModalAddGameProps) {
    const [gameName, setGameName] = useState('');
    const [timePlayed, setTimePlayed] = useState(0);
    const [gameCategory, setGameCategory] = useState('');
    const { categories, gameList, setGameList } = useContext(AuthContext);

    function onRequestClose() {
        setIsOpen(false);
    }

    async function handleCreateNewGame(event: React.FormEvent) {
        event.preventDefault();
        setGameList([...gameList, { gameName, timePlayed, gameCategory }].sort((a, b) => b.timePlayed - a.timePlayed));
        setGameName('');
        setTimePlayed(0);
    }

    return isOpen ? (
        <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
            <Container onSubmit={handleCreateNewGame}>
                <AiOutlineClose className="IconClose" onClick={onRequestClose} />
                <h2>ADICIONE UM NOVO JOGO</h2>
                <span>NOME</span>
                <input value={gameName} onChange={(event) => setGameName(event.target.value)} />
                <span>CATEGORIA</span>
                <select onChange={(event) => setGameCategory(event.target.value)}>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <span>TEMPO JOGADO</span>
                <input type="number" value={timePlayed} onChange={(event) => setTimePlayed(Number(event.target.value))} />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    ) : (
        <></>
    );
}
