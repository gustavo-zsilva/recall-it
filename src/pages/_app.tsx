import type { AppProps } from 'next/app'
import { theme } from '../styles/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { ModalProvider } from '../contexts/ModalContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const appTheme = extendTheme(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={appTheme}>
      <AuthProvider>
        <ThemeProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </ThemeProvider>
      </AuthProvider>
    // </ChakraProvider>
  )
}

export default MyApp