import { Flex, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react';

export function Header() {
    return (
        <Flex p={4} mb="1rem" justifyContent="space-between" alignItems="center">
            <Heading display="flex" color="gray.700">
                recall
                <Text color="cyan.600">.it</Text>
            </Heading>

            <ButtonGroup>
                <Button variant="solid" borderRadius={4} color="#FFF" bg="cyan.700" _hover={{ bg: "cyan.800" }}>
                    Login
                </Button>
                <Button variant="ghost" borderRadius={4}>
                    Sign Up
                </Button>
            </ButtonGroup>
        </Flex>
    );
}