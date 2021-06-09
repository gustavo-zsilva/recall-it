import Link from 'next/link'

import { Button, Flex } from '@chakra-ui/react'

import { AiOutlineGlobal } from 'react-icons/ai'
import { CgToday } from 'react-icons/cg'

export function Navigation() {
    return (
        <Flex 
            pos="fixed"
            bottom="4rem"
            right="50%"
            transform="translate(50%, 0)"
            bg="gray.200" 
            p="1rem" 
            borderRadius="2.2rem"
            boxShadow="0 0 3px 1px #00000012"
        >
            <Link href="/">
                <Button bg="transparent" _hover={{ bg: "gray.300" }}>
                    <AiOutlineGlobal size={32} />
                </Button>
            </Link>
            
            <Link href="/today">
                <Button bg="transparent" _hover={{ bg: "gray.300" }}>
                    <CgToday size={32} />
                </Button>
            </Link>
        </Flex>
    )
}