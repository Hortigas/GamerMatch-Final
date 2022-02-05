import '../styles/globals.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../../contexts/AuthContext';
import { ChatComponent } from '../components/Modal/ChatComponent/index';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer />
            <ChatComponent />
        </AuthProvider>
    );
}

export default MyApp;
