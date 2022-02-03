import { Container, Content, InputWrapper, Main } from '../components/Login/styles';
import logoIMG from '../assets/logoGamerMatchNTNL.png';
import Image from 'next/image';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRGuest } from '../../utils/withSSRGuest';
import Link from 'next/link';
import sha256 from 'crypto-js/sha256';
import { toast } from 'react-toastify';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { signUp } = useContext(AuthContext);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (passwordConfirm !== password) {
            toast.error('senhas diferentes');
        }
        const hash: string = sha256(password).toString();
        const data = {
            username,
            email,
            hash,
        };
        await signUp(data);
    }

    return (
        <Container>
            <Content>
                <div className="wrapperHero">
                    <Image src={logoIMG} alt="logo Gamer match" width="300px" height="300px" />
                </div>
                <Main>
                    <Image src={logoIMG} alt="logo Gamer match" width="80px" height="80px" />
                    <form onSubmit={handleSubmit}>
                        <InputWrapper>
                            <AiOutlineUser className="Icon" />
                            <input type="text" name="username" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </InputWrapper>
                        <InputWrapper>
                            <MdOutlineEmail className="Icon" />
                            <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </InputWrapper>
                        <InputWrapper>
                            <RiLockPasswordLine className="Icon" />
                            <input type="password" name="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </InputWrapper>
                        <InputWrapper>
                            <RiLockPasswordLine className="Icon" />
                            <input type="password" name="password" placeholder="Repetir senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                        </InputWrapper>
                        <div className="wrapperLogin">
                            <Link href="/login" passHref>
                                <button>Voltar</button>
                            </Link>
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </Main>
            </Content>
        </Container>
    );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return { props: {} };
});
