import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container } from '../components/Profile/styles';

export default function Profile() {
    return <Container></Container>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
