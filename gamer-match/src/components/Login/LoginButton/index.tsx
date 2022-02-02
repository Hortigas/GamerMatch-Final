import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { Button, Icon } from './styles';

interface LoginButtonProps {
    buttonType: 'google' | 'facebook' | 'twitter';
    onClick?: () => void;
}

export function LoginButton({ buttonType, onClick }: LoginButtonProps) {
    function handleOnclick() {
        if (!onClick) onClick();
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
            <Button buttonType={buttonType} onClick={handleOnclick}>
                <Icon buttonType={buttonType}>{renderSwitch(buttonType)}</Icon>
                Continue with {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
            </Button>
        </>
    );
}
