import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export default function Landing() {
    const { user, signOut } = useContext(AuthContext);

    useEffect(() => {
        api.get('/me')
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <h1>Hello {user?.email}</h1>
            <button onClick={signOut}>deslogar</button>
        </>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    try {
        const response = await apiClient.get('/me');
    } catch (err) {
        console.log(err instanceof AuthTokenError);
    }

    return { props: {} };
});
