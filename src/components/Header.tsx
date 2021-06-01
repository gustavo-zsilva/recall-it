import Link from 'next/link';
import Image from 'next/image';

import { FiUser } from 'react-icons/fi';

import {
    Flex,
    Heading,
    Text,
    Button,
    ButtonGroup,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {

    const { user, isAuthenticated, isUserLoading } = useAuth();
    console.log(user)

    return (
        <Flex p={4} mb="1rem" justifyContent="space-between" alignItems="center">
            <Link href="/">
                <Heading display="flex" color="gray.700" cursor="pointer">
                    recall
                    <Text color="cyan.600">.it</Text>
                </Heading>
            </Link>

            {isAuthenticated ? (
                <Menu>
                    <MenuButton _hover={{ bg: 'gray.100' }} as={Button} bg="gray.50" borderRadius="2rem">
                        <Flex alignItems="center" gridGap="1rem">
                            {user.photoUrl ? (
                                <Image
                                    width={50}
                                    height={50}
                                    src={user.photoUrl}
                                    alt="User Photo"
                                />
                            ) : (
                                <FiUser size={28} />
                            )}

                            <Text fontWeight="medium">
                                {user.name || user.email}
                            </Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Cards</MenuItem>
                    </MenuList>
                </Menu>
            ) : (
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
            )}
            
        </Flex>
    );
}