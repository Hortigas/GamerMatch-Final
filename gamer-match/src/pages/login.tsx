import { Container, Content, InputWrapper, Main } from '../components/Login/styles';
import logoIMG from '../assets/logoGamerMatchNTNL.png';
import heroIMG from '../assets/hero-image.png';
import Image from 'next/image';
import { LoginButton } from '../components/Login/LoginButton';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRGuest } from '../../utils/withSSRGuest';
import { GoogleLogin } from 'react-google-login';
import Link from 'next/link';
import sha256 from 'crypto-js/sha256';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, signInWithGoogle } = useContext(AuthContext);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const hash: string = sha256(password).toString();
        const data = {
            inputEmail: email,
            inputHash: hash,
        };
        await signIn(data);
    }

    async function handleGoogleLogin(response) {
        const { tokenId } = response;
        await signInWithGoogle(tokenId);
    }

    const handleGoogleFail = (response) => {};

    return (
        <Container>
            <Content>
                <div className="wrapperHero">
                    <Image src={heroIMG} alt="hero image Gamer match" width="600px" height="600px" className="hero" />
                </div>
                <Main>
                    <Image src={logoIMG} alt="logo Gamer match" width="80px" height="80px" />
                    <form onSubmit={handleSubmit}>
                        <InputWrapper>
                            <MdOutlineEmail className="Icon" />
                            <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </InputWrapper>
                        <InputWrapper>
                            <RiLockPasswordLine className="Icon" />
                            <input type="password" name="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </InputWrapper>
                        <div className="wrapperLogin">
                            <Link href="/register" passHref>
                                <button>Registrar</button>
                            </Link>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    <GoogleLogin
                        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                        render={(renderProps) => <LoginButton buttonType={'google'} onClick={renderProps.onClick} />}
                        buttonText="Login"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleFail}
                        cookiePolicy={'single_host_origin'}
                    />
                    <LoginButton buttonType={'facebook'} />
                    <LoginButton buttonType={'twitter'} />
                </Main>
            </Content>
        </Container>
    );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return { props: {} };
});
