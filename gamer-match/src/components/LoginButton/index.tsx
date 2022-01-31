import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { Button, Icon } from './styles';
import { signIn, signOut, useSession } from 'next-auth/react';

interface LoginButtonProps {
    buttonType: 'google' | 'facebook' | 'twitter';
}

export function LoginButton({ buttonType }: LoginButtonProps) {
    const session = useSession();

    function handleOnclick() {
        signIn('google');
    }

    function renderSwitch(buttonType: string) {
        switch (buttonType) {
            case 'google':
                return <FaGoogle className="ic" />;
            case 'facebook':
                return <FaFacebook className="ic" />;
            case 'twitter':
                return <FaTwitter className="ic" />;
        }
    }
    return (
        <>
            <Button buttonType={buttonType} onClick={() => signIn(buttonType)}>
                <Icon buttonType={buttonType}>{renderSwitch(buttonType)}</Icon>
                Continue with {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
            </Button>
        </>
    );
}
