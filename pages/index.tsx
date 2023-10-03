import React from 'react';
import { GetStaticProps } from 'next';
import { Grid, Stack, Text, Image, Button, Link, Box, Flex} from '@chakra-ui/react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Product } from '../product/types';
import api from '../product/api';

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

  const IndexRoute: React.FC<Props> = ({products}) => {
    const [cart, setCart] = React.useState<Product[]>([]);
    const [selectedImage, setSelectedImage] = React.useState<string>(null);
    const text = React.useMemo(
      () => 
        cart
          .reduce(
            (message, product) =>  
              message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),``,
              )
            .concat( `\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`
        ), 
    [cart],
  );

  return ( 
    <AnimatePresence>
      <Stack spacing={6}>
          <Grid gridGap={6} templateColumns= "repeat(auto-fill, minmax(240px, 1fr))">
      {products.map((product) => (
        <Stack 
            spacing={3} 
            borderRadius="md" 
            padding={4} 
            backgroundColor ="gray.100" 
            key={product.id}>
          <Image 
              alt={product.title} 
              as={motion.img}
              cursor="pointer"
              layoutId={product.image} 
              maxHeight={128} 
              objectFit="cover" 
              onClick={() => setSelectedImage(product.image)}
              src={product.image}>
              </Image>
          <Stack spacing={1}>
            <Text fontSize="sm" fontWeight="500" color="green.500">{product.title}</Text>
            <Text>{parseCurrency(product.price)}</Text>
          </Stack>
          <Button size="sm" variant="outline" onClick={() => setCart((cart) => cart.concat(product))} colorScheme="primary">Agregar</Button>
      </Stack>
      ))}
    </Grid>
    <AnimatePresence>
    {Boolean(cart.length) && (
        <Flex 
            initial={{scale: 0}} 
            animate={{scale: 1}} 
            exit={{scale: 0}} 
            as={motion.div} 
            alignItems="center" 
            justifyContent="center"  
            bottom={4} 
            position="sticky">
          <Button 
            isExternal
            as={Link}
            href={`https://wa.me/54138182818228?text=${encodeURIComponent(text)}`}
            colorScheme="whatsapp"
            leftIcon={<Image src="https://icongr.am/feather/whatsapp.svg?size=32&color=fffff"/>}
            width="fit-content">
              Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
      )}
    </AnimatePresence>
    </Stack>
    <AnimatePresence>
      {selectedImage && (
        <Flex 
          key="backdrop" 
          alignItems="center" 
          as={motion.div} 
          backgroundColor="rgba(0,0,0,0.5)" 
          justifyContent="center" 
          layoutId={selectedImage}
          position="fixed" 
          top={0} 
          left={0} 
          height="100%" 
          onClick={() => setSelectedImage(null)}
          width="100%" 
          >
        <Image key="image" src={selectedImage}/>
        </Flex>
      )}
    </AnimatePresence>
    </AnimatePresence>
  );
};

export const getStaticProps : GetStaticProps = async () => {
  const products = await api.list();
  return {
    revalidate: 10, //para ver la informacion actualizada
    props:{
      products,
    },
  };
};

export default IndexRoute;
