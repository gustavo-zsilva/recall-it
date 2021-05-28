import Link from 'next/link';

import { Flex, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react';

export function Header() {
    return (
        <Flex p={4} mb="1rem" justifyContent="space-between" alignItems="center">
            <Link href="/">
                <Heading display="flex" color="gray.700" cursor="pointer">
                    recall
                    <Text color="cyan.600">.it</Text>
                </Heading>
            </Link>

            <ButtonGroup>
                <Link href="/login">
                    <Button variant="solid" borderRadius={4} color="#FFF" bg="cyan.600" _hover={{ bg: "cyan.700" }}>
                        Login
                    </Button>
                </Link>
                
                <Link href="/signup">
                    <Button variant="ghost" borderRadius={4}>
                        Sign Up
                    </Button>
                </Link>
            </ButtonGroup>
        </Flex>
    );
}