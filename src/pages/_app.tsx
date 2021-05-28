import type { AppProps } from 'next/app'
import { theme } from '../styles/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const appTheme = extendTheme(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={appTheme}>
      <Component {...pageProps} />
    // </ChakraProvider>
  )
}
export default MyApp
