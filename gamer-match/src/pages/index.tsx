import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { Home } from '../components/Home/styles';

export default function Landing() {
    const { user, signOut } = useContext(AuthContext);

    return (
        <Home>
            <h1>Hello {user?.email}</h1>
            <button onClick={signOut}>deslogar</button>
        </Home>
    );
}
