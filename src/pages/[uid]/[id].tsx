import { useEffect, useState } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

import firebase, { firestore } from '../../lib/firebase'
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
    answer: string | null,
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
    answer: string,
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

    async function submitAnswer({ answer }: FormData) {
        const response = note.content.trim().toLowerCase().split(' ')
        const formattedAnswer = answer.trim().toLowerCase().split(' ')

        let newAnswer: HistoricNode;

        if (
            formattedAnswer.join('-') === response.join('-') ||
            response.length === formattedAnswer.length + 1 ||
            response.length === formattedAnswer.length - 1
        ) {
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

        const notesHistoric = [...historic, newAnswer]
        setHistoric([...historic, newAnswer])

        await api.patch(`/notes/${note.uuid}`, {
            data: notesHistoric,
        })

        setIsAnswered(true)
        resetForm()
        reset()
        pause()
    }

    async function handleSetSchedule(difficulty: string) {

        const date = new Date()

        switch (difficulty) {
            case 'easy':
                date.setHours(date.getHours() + 24) // 1 day
                break
            case 'medium':
                date.setHours(date.getHours() + 3) // 3 hours
                break
            case 'hard':
                date.setMinutes(date.getMinutes() + 30) // 30 minutes
                break
        }

        const schedule = firebase.firestore.Timestamp.fromDate(date);

        await api.post('/schedule', {
            schedule,
            uuid: note.uuid,
        })
    }

    async function handleShowQuestionAnswer() {
        const newAnswer = {
            answer: null,
            isCorrect: false,
            finishTime: `${minutes}:${seconds}`,
            id: uuid(),
        }

        const noteHistoric = [...historic, newAnswer]
        setHistoric([...historic, newAnswer])

        await api.patch(`/notes/${note.uuid}`, {
            data: noteHistoric
        })
        setIsCorrect(false)
        setIsAnswered(true)
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
                                    onClick={handleShowQuestionAnswer}
                                >
                                    Haven't got any answers?
                                </Button>
                            </Flex>
                        )}
                        
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
                                    disabled={isAnswered}
                                    autoComplete="off"
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
                            key={node.id}
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
    let note: Note;

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