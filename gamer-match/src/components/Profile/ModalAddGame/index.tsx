import { Container } from './styles';
import Modal from 'react-modal';
import { MutableRefObject, useEffect, useState } from 'react';

interface ModalAddGameProps {
    childFunc: MutableRefObject<any>;
}

function afterOpenModal() {}

function closeModal() {}

export function ModalAddGame({ childFunc }: ModalAddGameProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        childFunc.current = openModal;
    }, []);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <Container>
            <Modal ariaHideApp={false} isOpen={isOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} className="modalAddGame" contentLabel="Example Modal">
                <h2>Adicionar jogo</h2>
            </Modal>
        </Container>
    );
}
