import { Container, Content, InputWrapper, Main } from './styles';
import logoIMG from '../../assets/logoImg2.png';

import { LoginButton } from '../../components/LoginButton';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';

export default function Login() {
    return (
        <Container>
            <Content>
                <div className="wrapperHero">
                    <Image src={logoIMG} alt="logo Gamer match" width="300px" height="300px" />
                </div>
                <Main>
                    <Image src={logoIMG} alt="logo Gamer match" width="100px" height="100px" />
                    <InputWrapper>
                        <MdOutlineEmail className="emailIcon" />
                        <input type="email" placeholder="E-mail" name="email" id="email" required></input>
                    </InputWrapper>
                    <InputWrapper>
                        <RiLockPasswordLine className="passwordIcon" />
                        <input type="password" placeholder="Senha" name="password" id="password" required />
                    </InputWrapper>
                    <div className="wrapperLogin">
                        <button>Registrar</button>
                        <button>Login</button>
                    </div>
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    <LoginButton buttonType={'google'} />
                    <LoginButton buttonType={'facebook'} />
                    <LoginButton buttonType={'twitter'} />
                </Main>
            </Content>
        </Container>
    );
}
