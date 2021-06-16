import { useEffect, useState } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

import { firestore } from '../../lib/firebase'
import { Layout } from '../../components/Layout'

import { useForm } from 'react-hook-form'
import { useStopwatch } from 'react-timer-hook'
import { v4 as uuid } from 'uuid'
import { api } from '../../services/api'

import {
    AiOutlineCheckSquare,
    AiOutlineCloseSquare,
    AiOutlineSend,
    AiOutlineExclamationCircle,
    AiOutlineQuestionCircle,
} from 'react-icons/ai'
import { FiClock } from 'react-icons/fi'

import { Flex, Box, Text, Button, Input, ButtonGroup, Divider } from '@chakra-ui/react'

type HistoricNode = {
    answer: string,
    isCorrect: boolean,
    finishTime: string,
    id: string,
}

type Note = {
    question: string,
    content: string,
    uuid: string,
    schedule: {
        seconds: number,
        nanoseconds: number,
    },
    historic: HistoricNode[],
}

interface QuestionProps {
    note: Note;
}

type FormData = {
    userAnswer: string,
}

export default function Question({ note }: QuestionProps) {

    const { register, handleSubmit, reset: resetForm } = useForm()
    const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: true })
    const [isCorrect, setIsCorrect] = useState(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [historic, setHistoric] = useState<HistoricNode[]>([])

    useEffect(() => {
        setHistoric(note.historic)
    }, [])

    async function submitAnswer({ userAnswer }: FormData) {
        const response = note.content.trim().toLowerCase().split(' ').join('-')
        const answer = userAnswer.trim().toLowerCase().split(' ').join('-')

        const notesHistoric: HistoricNode[] = [...note.historic]
        let newAnswer: HistoricNode;

        if (answer === response) {
            newAnswer = {
                answer,
                isCorrect: true,
                finishTime: `${minutes}:${seconds}`,
                id: uuid(),
            }
            setIsCorrect(true)
        } else {
            newAnswer = {
                answer,
                isCorrect: false,
                finishTime: `${minutes}:${seconds}`,
                id: uuid(),
            }
            setIsCorrect(false)
        }

        notesHistoric.push(newAnswer)
        setHistoric([...historic, newAnswer])

        try {
            await api.patch(`/notes/${note.uuid}`, {
                data: notesHistoric,
            })
    
            setIsAnswered(true)
            resetForm()
            reset()
            pause()
        } catch (err) {
            console.error(err)
        }
    }

    async function handleSetSchedule(date: string) {
        try {
            await api.post('/schedule', {
                data: date,
                uuid: note.uuid,
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Layout>
            <Head>
                <title>{note.question} | recall.it</title>
            </Head>

            <Box display="grid" gridTemplateColumns="1fr auto" gridGap="1.6rem">
                <Flex flexDir="column">
                    <Flex
                        transition=".1s"
                        flexDir="column"
                        p="1rem"
                        border="1px solid"
                        _focusWithin={{ border: "3px solid", borderColor: "cyan.600" }}
                        borderColor="cyan.600"
                        borderRadius="1rem"
                        gridGap="1rem"
                    >
                        <Flex flexDir="column">
                            <Flex justifyContent="space-between">
                                <Text fontSize="1.4rem">Question:</Text>
                                <Flex>
                                    {minutes}:
                                    {seconds}
                                </Flex>
                            </Flex>
                            <Text fontSize="2rem">{note.question}</Text>
                        </Flex>
                        {isAnswered ? (
                            <Flex borderLeft="2px solid" borderColor="cyan.600" pl=".6rem">
                                {isCorrect ? <AiOutlineCheckSquare size={32} color="#9AE6B5" /> : <AiOutlineCloseSquare size={32} color="#FC8181" />}
                                <Text p=".2rem .6rem" borderRadius=".2rem">{note.content}</Text>
                            </Flex>
                        ) : (
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
                        )}
                        
                        <form onSubmit={handleSubmit(submitAnswer)}>
                            <Flex gridGap="1rem" h="3rem">
                                <Input
                                    {...register("userAnswer", {
                                        required: true,
                                    })}
                                    variant="outline"
                                    placeholder="Your answer"
                                    h="auto"
                                    _focus={{ borderColor: "cyan.600" }}
                                    disabled={isAnswered}
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

                        {isAnswered && (
                            <Flex flexDir="column" m="auto">
                                <Text mb="1rem">How was the difficulty level of this question?</Text>
                                <ButtonGroup spacing={0} justifyContent="center">
                                    <Button colorScheme="green" borderRadius=".2rem 0 0 .2rem" onClick={() => handleSetSchedule('easy')}>
                                        Easy
                                    </Button>
                                    <Button colorScheme="yellow" color="#FFF" borderRadius="0" onClick={() => handleSetSchedule('medium')}>
                                        Medium
                                    </Button>
                                    <Button colorScheme="red" borderRadius="0 .2rem .2rem 0" onClick={() => handleSetSchedule('hard')}>
                                        Hard
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        )}
                    </Flex>
                    
                    {isAnswered && historic.map(node => (
                        <Flex
                            border="1px solid"
                            borderColor="cyan.600"
                            borderRadius="1rem"
                            p="1rem"
                            mt="2rem"
                            justifyContent="space-between"
                        >
                            <Text>{node.answer}</Text>
                            <Flex alignItems="center">
                                <FiClock size={18} />
                                <Text ml=".2rem">{node.finishTime}</Text>
                            </Flex>
                        </Flex>   
                    ))}
                    
                </Flex>
                
                <Box
                    bg="gray.100"
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gridAutoRows="max-content"
                    gridGap=".2rem"
                    borderLeft="3px solid"
                    borderColor="cyan.600" p="1.6rem"
                    borderRadius=".2rem"
                >
                    {historic.map(node => {
                        return (
                            <Box
                                key={node.id}
                                w="30px"
                                h="30px"
                                borderRadius=".1rem"
                                bg={node.isCorrect ? 'green.200' : 'red.300'}
                            />
                        )
                    })}
                </Box>
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