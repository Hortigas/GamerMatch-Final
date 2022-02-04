import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../src/services/errors/AuthTokenError';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        if (!cookies['GamerMatch.token']) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, 'GamerMatch.token');
                destroyCookie(ctx, 'GamerMatch.refreshToken');
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                };
            }
        }
    };
}
