import { Button, Icon } from './styles';

import Battle from './../../../assets/battle-net.svg';
import Steam from './../../../assets/Steam.png';
import Epic from './../../../assets/Epic.png';

import Image from 'next/image';

interface LoginButtonProps {
    buttonType: 'blizzard' | 'steam' | 'epicGames';
    onClick?: () => void;
}

export function LoginButton({ buttonType, onClick }: LoginButtonProps) {
    function handleOnclick() {
        if (onClick) onClick();
    }
    function renderSwitch(buttonType: string) {
        switch (buttonType) {
            case 'blizzard':
                return <Image src={Battle} height="30px" width="30px" />;
            case 'steam':
                return <Image src={Steam} height="30px" width="30px" />;
            case 'epicGames':
                return <Image src={Epic} height="30px" width="30px" />;
        }
    }
    return (
        <>
            <Button buttonType={buttonType} onClick={handleOnclick}>
                <Icon buttonType={buttonType}>{renderSwitch(buttonType)}</Icon>
                Connect with {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
            </Button>
        </>
    );
}
