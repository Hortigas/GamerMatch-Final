import { withSSRAuth } from '../../utils/withSSRAuth';

export default function Login() {
    return <h1>profile page</h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
