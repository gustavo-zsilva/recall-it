import Link from 'next/link';
import Image from 'next/image';

import { FiUser, FiLogOut } from 'react-icons/fi';
import { AiOutlineReload } from 'react-icons/ai';

import {
    Flex,
    Heading,
    Text,
    Button,
    ButtonGroup,
    SkeletonText,
    SkeletonCircle,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth'
import { useNotes } from '../hooks/useNotes'

export function Header() {

    const { user, isAuthenticated, isUserLoading, signOut } = useAuth();
    const { reloadNotes } = useNotes();
    
    async function handleSignOut() {
        try {
            await signOut();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Flex p="1rem 0" mb="1rem" justifyContent="space-between" alignItems="center">
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
                                // <SkeletonCircle isLoaded={isUserLoading}>
                                    <Flex borderRadius="50%" w="2rem" h="2rem" overflow="hidden">
                                        <Image
                                            width={50}
                                            height={50}
                                            src={user.photoUrl}
                                            alt="User Photo"
                                            objectFit="cover"
                                        />
                                    </Flex>
                                // </SkeletonCircle>
                            ) : (
                                <FiUser size={28} />
                            )}
                            {/* <SkeletonText noOfLines={1} isLoaded={isUserLoading}> */}
                                <Text fontWeight="medium">
                                    {user.name ?? user.email}
                                </Text>
                            {/* </SkeletonText> */}
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<FiUser size={20} />}>Profile</MenuItem>
                        <MenuItem icon={<FiLogOut size={20} />} onClick={handleSignOut}>Logout</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<AiOutlineReload size={20} />} onClick={reloadNotes}>Reload Notes</MenuItem>
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