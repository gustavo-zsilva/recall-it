import type { AppProps } from 'next/app'
import { theme } from '../styles/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';

const appTheme = extendTheme(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={appTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    // </ChakraProvider>
  )
}
export default MyApp
