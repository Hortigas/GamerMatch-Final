import { Container } from './styles';
import { BsFillGearFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useContext, useState } from 'react';

export function SubMenu() {
    const { user, signOut } = useContext(AuthContext);

    function handleLogout() {
        signOut();
    }

    return (
        <Container>
            <div className="perfil">
                <h5>{user?.username}</h5>
                <span>{user?.email}</span>
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
