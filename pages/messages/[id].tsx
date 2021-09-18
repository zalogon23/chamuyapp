import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, HStack, Square, Stack } from "@chakra-ui/layout";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Router from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Match } from ".";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import Text from "../../components/Text";
import { messagesContext } from "../../context/messages";
import { userContext } from "../../context/user";
import client from "../../lib/apolloClient";
import queries from "../../lib/queries";
import { fontSize } from "../../lib/styles";

interface Message {
  avatar: string,
  content: string,
  id: number,
  createdAt: Date,
  receiverID: number,
  senderID: number,
  self: boolean
}

const MessagesID: NextPage = () => {
  const { isLoggedOut, user } = useContext(userContext)
  const { matchesMessages, matchesNoMessages, setMatchesMessages, loading: messagesLoading } = useContext(messagesContext)
  const [messages, setMessages] = useState([] as Message[])
  const [anotherUser, setAnotherUser] = useState({} as Match)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const pathname = window?.location.pathname
    const id = Number(pathname.slice(pathname.indexOf("/", 1) + 1))
    if (id && !messagesLoading) {
      const conversation = matchesMessages.find(match => match.id === id) ?? matchesNoMessages.find(match => match.id === id)
      if (conversation !== undefined) setAnotherUser(conversation)
      const anotherUserName = conversation?.name || ""
      setName(anotherUserName)
      if (conversation === undefined) {
        Router.replace("/messages") // If no conversation match then redirect
        return
      }
      const currentMessages = JSON.parse(conversation?.content || "[]") as Message[]
      const selfAvatar = JSON.parse(user.images)[0]
      const avatarMessages = currentMessages.map(mes => ({
        ...mes,
        avatar: mes.senderID === user.id ? selfAvatar : JSON.parse(conversation.images)[0],
        self: mes.senderID === user.id ? true : false
      })) as Message[]
      setMessages(avatarMessages.sort(() => -1))
      if (anotherUserName !== "") setLoading(false)
    }
  }, [matchesMessages, messagesLoading])
  useEffect(() => {
    if (isLoggedOut) {
      Router.replace("/login")
    }
  }, [isLoggedOut])
  useEffect(() => {
    if (messages.length) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [messages])
  return (
    <>
      {
        !loading ?
          <>
            <Heading zIndex={20} pos="sticky" boxShadow="0 0 1rem #4445" top="0" bg="white" px="2"
              borderBottom="1px solid" borderBottomColor="gray.200" textAlign="center"
              py="1.5em">{`Conversación con ${name}`}</Heading>
            <Container maxW="container.lg" px="4" pb="10rem">
              {
                messages.map((mes, id) => <Line key={id} message={mes} />)
              }
            </Container>
            <MessageSender matchesMessages={matchesMessages} setMatchesMessages={setMatchesMessages} from={user.id} to={anotherUser.anotherID} name={name} />
          </>
          :
          <Loading />
      }
    </>
  )

  function Line({ message }: { message: Message }) {
    return (
      <Flex py="0.5em" borderBottom="1px solid" borderBottomColor="gray.200"
        direction={message.self ? "row-reverse" : "row"} alignItems="center" overflow="hidden">
        <Avatar zIndex={9} src={message.avatar} />
        <Text px="1.5rem" wordBreak="break-word">{message.content}</Text>
      </Flex>
    )
  }

}

interface SendMessage {
  to: number,
  from: number,
  name: string,
  setMatchesMessages: Dispatch<SetStateAction<Match[]>>,
  matchesMessages: Match[]
}

export function MessageSender({ name, from, to, setMatchesMessages, matchesMessages }: SendMessage) {
  const [content, setContent] = useState("")
  const [sending, setSending] = useState(false)
  return (
    <Square bg="white" boxShadow="0 0 1rem #4445" w="100%" pos="fixed" bottom="0" zIndex="dropdown"
      left="50%" transform="translateX(-50%)">
      <HStack onSubmit={(e) => {
        sendMessage()
        e.preventDefault()
      }} w="100%" px="4" py="8" maxW="45rem" as="form">
        <Input value={content} onChange={e => setContent(e.target.value)} fontSize={fontSize.paragraph} />
        <IconButton disabled={sending} onClick={sendMessage} fontSize={fontSize.paragraph} aria-label={`Enviar mensaje a ${name}`}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
      </HStack>
    </Square>
  )
  async function sendMessage() {
    if (content.length) {
      setSending(true)
      const sent = await client.mutate({
        mutation: queries.sendMessage, variables: {
          sendMessageContent: content,
          sendMessageTo: to,
          sendMessageFrom: from
        }
      })
      setMatchesMessages([...matchesMessages.map(match => {
        if (match.anotherID !== to) return match
        const contentParsed = JSON.parse(match.content)
        const newMessage = {
          id: Date.now(),
          senderID: from,
          receiverID: to,
          content,
          createdAt: new Date()
        }
        contentParsed.unshift(newMessage)
        return ({
          ...match,
          content: JSON.stringify(contentParsed)
        })
      })] as Match[])
      if (sent) {
        setContent("")
        setSending(false)
      }
    }
  }
}
export default MessagesID