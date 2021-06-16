import { ReactNode } from 'react';
import { Header } from './Header';

import { Flex } from '@chakra-ui/react';
import { Navigation } from './Navigation';
import { AddNoteButton } from './AddNoteButton';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <Flex maxW="80rem" h="100vh" m="auto" flexDir="column">
            <Header />

            {children}

            <Navigation />
            <AddNoteButton />

        </Flex>
    )
}