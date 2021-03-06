import { Container, ContainerPhoto } from './styles';
import { useEffect, useState, useContext, useRef } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from '../../../../contexts/AuthContext';

import AvatarEditor from 'react-avatar-editor';

interface ModalAddGameProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export function ModalAddAvatar({ isOpen, setIsOpen }: ModalAddGameProps) {
    const { user, setUser } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [zoom, setZoom] = useState(1);

    const EditorRef = useRef(null);
    const hiddenFileInput = useRef(null);

    function onRequestClose() {
        setIsFilePicked(false);
        setSelectedFile(undefined);
        setIsOpen(false);
    }

    async function loadAvatar(event: React.FormEvent) {}

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setZoom(1);
        setIsFilePicked(true);
    };

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const onClickSave = () => {
        const base64 = EditorRef.current.getImageScaledToCanvas().toDataURL();
        const newUser = user;
        newUser.avatar = base64;
        setUser(newUser);
        setIsFilePicked(false);
        setSelectedFile(undefined);
        setIsOpen(false);
    };

    return isOpen ? (
        <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
            {isFilePicked ? (
                <ContainerPhoto>
                    <AiOutlineClose className="IconClose" onClick={onRequestClose} />
                    <h2>AJUSTE A FOTO</h2>
                    <AvatarEditor
                        className="avatarEditor"
                        ref={EditorRef}
                        image={selectedFile}
                        width={400}
                        height={400}
                        border={10}
                        color={[0, 0, 0, 0.4]} // RGBA
                        scale={zoom}
                        rotate={0}
                        borderRadius={300}
                    />
                    <input type="range" name="zoom" min="1" max="5" step="0.01" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
                    <button onClick={onClickSave}>Salvar</button>
                </ContainerPhoto>
            ) : (
                <Container>
                    <AiOutlineClose className="IconClose" onClick={onRequestClose} />
                    <h2>ADICIONE UMA FOTO</h2>
                    <input type="file" name="myFile" ref={hiddenFileInput} onChange={changeHandler} style={{ display: 'none' }} accept="image/*" />
                    <button onClick={handleClick}>Carregar</button>
                </Container>
            )}
        </Modal>
    ) : (
        <></>
    );
}
