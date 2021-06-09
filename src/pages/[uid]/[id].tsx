import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { firestore } from '../../lib/firebase'
import { Layout } from '../../components/Layout'

import { AiOutlineSend } from 'react-icons/ai'
import { Flex, Box, Text, Button, Input } from '@chakra-ui/react'

type Note = {
    question: string,
    content: string,
    id: string,
}

interface QuestionProps {
    note: Note;
}

export default function Question({ note }: QuestionProps) {
    const router = useRouter()
    const id = router.query.id

    return (
        <Layout>
            <Head>
                <title>{note.question} | recall.it</title>
            </Head>

            <Box display="grid" gridTemplateColumns="1fr auto" gridGap="1.6rem">
                <Flex flexDir="column" p="1rem" border="3px solid" borderColor="cyan.600" borderRadius="1rem">
                    <Flex flexDir="column">
                        <Text fontSize="1.4rem">Question:</Text>
                        <Text fontSize="2rem">{note.question}</Text>
                    </Flex>
                    <Flex gridGap="1rem">
                        <Input variant="outline" placeholder="Your answer" _focus={{ borderColor: "cyan.600" }} />
                        <Button 
                            bg="cyan.700"
                            color="#FFF"
                            _hover={{ bg: "cyan.600" }}
                            rightIcon={<AiOutlineSend size={26} color="#FFF" />}
                        >
                            Answer
                        </Button>
                    </Flex>
                </Flex>
                
                <Flex bg="gray.100" borderLeft="3px solid" borderColor="cyan.600" p="1.6rem" borderRadius=".2rem">
                    tags
                </Flex>
            </Box>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    let paths = [];

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { uid, id } = params
    let note;

    try {
        const noteSnapshot = await firestore
            .collection('users')
            .doc(String(uid))
            .collection('notes')
            .doc(String(id))
            .get()

        note = JSON.parse(JSON.stringify(noteSnapshot.data()))
        
    } catch (err) {
        console.error(err)
    }

    return {
        props: {
            note,
        }
    }
}