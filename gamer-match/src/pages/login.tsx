import { Container, Content, InputWrapper, FormMain } from '../components/Login/styles';
import logoIMG from '../assets/logoGamerMatchNTNL.png';

import { LoginButton } from '../components/Login/LoginButton';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

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

    return (
        <Container>
            <Content>
                <div className="wrapperHero">
                    <Image src={logoIMG} alt="logo Gamer match" width="300px" height="300px" />
                </div>
                <FormMain onSubmit={handleSubmit}>
                    <Image src={logoIMG} alt="logo Gamer match" width="100px" height="100px" />
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
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    <LoginButton buttonType={'google'} />
                    <LoginButton buttonType={'facebook'} />
                    <LoginButton buttonType={'twitter'} />
                </FormMain>
            </Content>
        </Container>
    );
}
