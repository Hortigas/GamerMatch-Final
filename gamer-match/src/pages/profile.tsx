import { withSSRAuth } from '../../utils/withSSRAuth';
import { Container, UL } from '../components/Profile/styles';
import Image from 'next/image';
import Avatar from '../assets/UserPics/userpic1.jpg';
import Control from '../assets/control.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { LoginButton } from './../components/Profile/LoginButton/index';
import { MdModeEditOutline } from 'react-icons/md';
import React from 'react';

const dataT = [
    { name: 'Overwatch', played: 1230 },
    { name: 'Minecraft', played: 402 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
    { name: 'CS-GO', played: 2311 },
];

export default function Profile() {
    const [postImage, setPostImage] = useState({
        myFile: "",
    });
    const { user, uploadIMG } = useContext(AuthContext);
    const hiddenFileInput = React.useRef(null);

    const upload = async (post) => {
        try {
            await uploadIMG(post);
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        upload(postImage);
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64 as string });
    };
    const handleChange = event => {
        //const fileUploaded = event.target.files[0];
        handleFileUpload(event);
    };
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <Container>
            <div className="profile wrapper">
                <div className="info">
                    <Image src={Avatar} alt="hero image Gamer match" width="180px" height="180px" className="avatar" />
                    <form onSubmit={handleSubmit}>
                    <input type="file" label="Image" name="myFile" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} accept=".png" />
                    <MdModeEditOutline className="editPerfil" onClick={handleClick} />
                    <button>Submit</button>
                    </form>
                    <div className="name">
                        <h2>{user?.username}</h2>
                        <h3>23 anos</h3>
                    </div>
                </div>
                <div className="buttons">
                    <LoginButton buttonType={'blizzard'} />
                    <LoginButton buttonType={'steam'} />
                    <LoginButton buttonType={'epicGames'} />
                </div>
            </div>

            <div className="gamesList wrapper">
                <h3>Seus jogos mais jogados:</h3>
                <GamesList />
            </div>
            <div className="aboutme wrapper">
                about me:
                <textarea disabled />
            </div>
        </Container>
    );
}

function GamesList() {
    return (
        <UL>
            {dataT.map((i) => (
                <li>
                    <div className="gameIcon">
                        <Image src={Control} width="40px" />
                    </div>
                    {i.name} <span> ({i.played} horas)</span>
                </li>
            ))}
        </UL>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
