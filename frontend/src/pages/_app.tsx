import { useEffect, useState } from 'react';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AppContainer } from '@styles/pages/_app.style';
//import lightTheme from "ui/themes/theme";
import { ThemeProvider } from '@material-ui/core';
import Header from 'ui/components/surface/Header/Header';
import Footer from 'ui/components/surface/Footer/Footer';
import theme, { redTheme } from 'ui/themes/theme';
import { MainProvider } from 'data/contexts/MainContext';

function App({ Component, pageProps }: AppProps) {
    /* const [myTheme, setMyTheme] = useState(theme);*/
    useEffect(() => {
        document.querySelector('#jss-server-side')?.remove();
    }, []);
    /*
  useEffect(() => {
    setTimeout(() => {
      setMyTheme(redTheme);
    }, 3000);
  }, []);*/

    return (
        <>
            <Head>
                <title>
                    {' '}
                    E-diaristas {pageProps.title && `- ${pageProps.title}`}
                </title>
            </Head>
            <ThemeProvider theme={theme}>
                <AppContainer>
                    <Header />
                    <main>
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </AppContainer>
            </ThemeProvider>
        </>
    );
}

const AppProviderContainer: React.FC<AppProps> = (props) => {
    //vai ser como um clone do componente principal já com os providers
    return (
        <MainProvider>
            <App {...props} />
        </MainProvider>
    );
};

export default AppProviderContainer;
