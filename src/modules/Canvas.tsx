'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { Paint } from '@/components/Paint';

export const Canvas = () => {
  return (
    <ChakraProvider>
      <Paint />
    </ChakraProvider>
  );
};
