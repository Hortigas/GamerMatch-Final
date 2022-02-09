import '../styles/globals.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../../contexts/AuthContext';
import { ChatComponent } from '../components/Modal/ChatComponent/index';
import { ToastContainer } from 'react-toastify';
import { ChatboxProvider } from '../hooks/useChatbox';
import 'react-toastify/dist/ReactToastify.css';
import { socket, SocketContext } from '../services/socket';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Header />
            <Component {...pageProps} />
            <ToastContainer bodyClassName="toast" />
            <SocketContext.Provider value={socket}>
                <ChatboxProvider>
                    <ChatComponent />
                </ChatboxProvider>
            </SocketContext.Provider>
        </AuthProvider>
    );
}

export default MyApp;
