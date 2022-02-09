import { Container } from './styles';
import Image from 'next/image';
import logoIMG from '../../assets/logoGamerMatchNTNL.png';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { SubMenu } from './SubMenu';

import { createRef, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export function Header() {
    const { user } = useContext(AuthContext);
    const [submenu, setSubmenu] = useState(false);

    function handleOpenMenu() {
        setSubmenu(!submenu);
    }

    if (!!user) {
        return (
            <Container>
                <a href="/">
                    <Image src={logoIMG} alt="logo Gamer match" width="80px" height="80px" />
                </a>
                <div className="perfilMenuWrapper">
                    <a className="navbarPerfil" onClick={handleOpenMenu}>
                        {user.username}
                        <MdKeyboardArrowDown className="navbarArrow" />
                    </a>
                    {submenu ? <SubMenu /> : ''}
                </div>
            </Container>
        );
    } else {
        return <div></div>;
    }
}
