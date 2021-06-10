import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { firestore } from '../../lib/firebase'
import { Layout } from '../../components/Layout'

import { useForm } from 'react-hook-form'

import { AiOutlineSend, AiOutlineExclamationCircle, AiOutlineQuestionCircle } from 'react-icons/ai'
import { Flex, Box, Text, Button, Input } from '@chakra-ui/react'
import { api } from '../../services/api'

type HistoricNode = {
    answer: string,
    isCorrect: boolean,
}

type Note = {
    question: string,
    content: string,
    uuid: string,
    historic: HistoricNode[],
}

interface QuestionProps {
    note: Note;
}

type FormData = {
    answer: string,
}

export default function Question({ note }: QuestionProps) {

    const { register, handleSubmit, reset } = useForm()

    async function submitAnswer({ answer }: FormData) {

        const response = note.content.trim().toLowerCase().replace(' ', '');
        const userAnswer = answer.trim().toLowerCase().replace(' ', '')



        await api.patch(`/notes/${note.uuid}`, {
            data: note.historic
        })
    }

    return (
        <Layout>
            <Head>
                <title>{note.question} | recall.it</title>
            </Head>

            <Box display="grid" gridTemplateColumns="1fr auto" gridGap="1.6rem">
                <Flex flexDir="column" p="1rem" border="3px solid" borderColor="cyan.600" borderRadius="1rem" gridGap="1rem">
                    <Flex flexDir="column">
                        <Text fontSize="1.4rem">Question:</Text>
                        <Text fontSize="2rem">{note.question}</Text>
                    </Flex>
                    <Flex alignItems="center" gridGap=".8rem" bg="gray.200" p="1rem" borderRadius=".4rem">
                        <AiOutlineExclamationCircle size={32} />
                        <Text>You need to answer the question first to see the response.</Text>
                        <Button
                            bg="red.400"
                            color="#FFF"
                            _hover={{ bg: "red.500" }}
                            leftIcon={<AiOutlineQuestionCircle size={32} color="#FFF" />}
                        >
                            Haven't got any answers?
                        </Button>
                    </Flex>
                    <form onSubmit={handleSubmit(submitAnswer)}>
                        <Flex gridGap="1rem" h="3rem">
                            <Input
                                {...register("answer", {
                                    required: true,
                                })}
                                variant="outline"
                                placeholder="Your answer"
                                h="auto"
                                _focus={{ borderColor: "cyan.600" }}
                            />
                            <Button
                                type="submit"
                                bg="cyan.700"
                                color="#FFF"
                                _hover={{ bg: "cyan.600" }}
                                h="auto"
                                rightIcon={<AiOutlineSend size={26} color="#FFF" />}
                            >
                                Answer
                            </Button>
                        </Flex>
                    </form>
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
            .where('uuid', '==', String(id))
            .get()

        note = JSON.parse(JSON.stringify(noteSnapshot.docs[0].data()))
        
    } catch (err) {
        console.error(err)
    }

    return {
        props: {
            note,
        }
    }
}