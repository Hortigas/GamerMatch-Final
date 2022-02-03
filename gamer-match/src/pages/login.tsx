import { Container, Content, InputWrapper, Main } from '../components/Login/styles';
import logoIMG from '../assets/logoGamerMatchNTNL.png';
import Image from 'next/image';
import { LoginButton } from '../components/Login/LoginButton';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRGuest } from '../../utils/withSSRGuest';
import { GoogleLogin } from 'react-google-login';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            email,
            password,
        };
        await signIn(data);
    }

    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <Container>
            <Content>
                <div className="wrapperHero">
                    <Image src={logoIMG} alt="logo Gamer match" width="300px" height="300px" />
                </div>
                <Main>
                    <Image src={logoIMG} alt="logo Gamer match" width="100px" height="100px" />
                    <form onSubmit={handleSubmit}>
                        <InputWrapper>
                            <MdOutlineEmail className="emailIcon" />
                            <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </InputWrapper>
                        <InputWrapper>
                            <RiLockPasswordLine className="passwordIcon" />
                            <input type="password" name="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </InputWrapper>
                        <div className="wrapperLogin">
                            <button>Registrar</button>
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
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
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

/*
                    <GoogleLogin
                        clientId={process.env.GOOGLE_CLIENT_ID}
                        render={(renderProps) => <LoginButton buttonType={'google'} onClick={renderProps.onClick} />}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
*/
