import  React  from 'react';
import { ChakraProvider, Text, Container, VStack, Image, Heading, Box, Divider} from '@chakra-ui/react';
import { AppProps } from 'next/app';
import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps })  => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
      <Container
        borderRadius="sm"
        backgroundColor="white"
        boxShadow="md"
        marginY={4}
        maxWidth="container.xl"
        padding={4}
      >
        <VStack marginBottom={6}>
          <Image maxHeight={128}  borderRadius={9999} src = "https://cdn-icons-png.flaticon.com/512/776/776645.png"></Image>
          <Heading>ALMACEN</Heading>
          <Text>El almacen de Maxi</Text>
        </VStack>
        <Divider marginY={6}/>
        <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;