import { Container } from './styles';
import { BsFillGearFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useContext, useState } from 'react';

export function SubMenu() {
    const { signOut } = useContext(AuthContext);

    function handleLogout() {
        signOut();
    }

    return (
        <Container>
            <div className="perfil">
                <h5>hortigas</h5>
                <span>horta@gmail.com</span>
            </div>
            <div className="nav">
                <a href="/profile">
                    <BsFillGearFill className="navIcon" />
                    Perfil
                </a>
                <a onClick={handleLogout}>
                    <FiLogOut className="navIcon" />
                    Sair
                </a>
            </div>
        </Container>
    );
}
