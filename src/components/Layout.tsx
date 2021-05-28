import { ReactNode } from 'react';
import { Header } from './Header';

import { Flex } from '@chakra-ui/react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <Flex maxW="80rem" h="100vh" m="auto" flexDir="column" position="relative">
            <Header />
            
            {children}
        </Flex>
    )
}