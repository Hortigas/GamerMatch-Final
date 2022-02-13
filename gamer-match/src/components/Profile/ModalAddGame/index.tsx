import { Container } from './styles';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalAddGameProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export function ModalAddGame({ isOpen, setIsOpen }: ModalAddGameProps) {
    const [game, setGame] = useState('');
    const [timePlayed, setTimePlayed] = useState(0);
    const [category, setCategory] = useState('');

    function onRequestClose() {
        setIsOpen(false);
    }

    async function handleCreateNewTransaction(event: React.FormEvent) {
        event.preventDefault();
    }

    return isOpen ? (
        <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
            <Container onSubmit={handleCreateNewTransaction}>
                <AiOutlineClose className="IconClose" onClick={onRequestClose} />
                <h2>Adicionar jogo</h2>
                <input placeholder="Título" value={game} onChange={(event) => setGame(event.target.value)} />
                <input placeholder="tempo jogado" type="number" value={timePlayed} onChange={(event) => setTimePlayed(Number(event.target.value))} />
                <select placeholder="Categoria" onChange={(event) => setCategory(event.target.value)}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    ) : (
        <></>
    );
}
