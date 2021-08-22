import '../styles/globals.css'
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from '@chakra-ui/theme'
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider >
      <CSSReset theme={theme}/>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
