'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { Paint } from '@/components/bkp/Paint';

export const Canvas = () => {
  return (
    <ChakraProvider>
      <Paint />
    </ChakraProvider>
  );
};
