import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import Text from "../../components/Text";
import { messagesContext } from "../../context/messages";
import { userContext } from "../../context/user";
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
  const { matchesMessages, matchesNoMessages } = useContext(messagesContext)
  const [messages, setMessages] = useState([] as Message[])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const pathname = window?.location.pathname
    const id = Number(pathname.slice(pathname.indexOf("/", 1) + 1))
    if (id) {
      const conversation = matchesMessages.find(match => match.id === id) ?? matchesNoMessages.find(match => match.id === id)
      const anotherUserName = conversation?.name || ""
      setTitle(anotherUserName)
      if (conversation === undefined) {
        Router.replace("/messages") // If no conversation match then redirect
        return
      }
      const currentMessages = JSON.parse(conversation?.content || "[]") as Message[]
      const selfAvatar = JSON.parse(user.images)[0]
      const avatarMessages = currentMessages.map(mes => ({
        ...mes,
        avatar: mes.id === user.id ? selfAvatar : JSON.parse(conversation.images)[0],
        self: mes.id === user.id ? true : false
      })) as Message[]
      setMessages(avatarMessages.sort(() => -1))
      if (anotherUserName !== "") setLoading(false)
    }
  }, [matchesMessages])
  useEffect(() => {
    if (isLoggedOut) {
      Router.replace("/login")
    }
  }, [isLoggedOut])
  return (
    <>
      {
        !loading ?
          <>
            <Heading px="2" borderBottom="1px solid" borderBottomColor="gray.200" textAlign="center"
              py="1.5em">{`Conversación con ${title}`}</Heading>
            {
              messages.map((mes, id) => <Line key={id} message={mes} />)
            }
            <Sender />
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
        <Avatar mx="1rem" src={message.avatar} />
        <Text wordBreak="break-word">{message.content}</Text>
      </Flex>
    )
  }

  function Sender() {
    return (
      <HStack w="100%" pos="fixed" bottom="0" zIndex="dropdown" px="4" py="8"
        left="50%" transform="translateX(-50%)" maxW="45rem" as="form">
        <Input fontSize={fontSize.paragraph} />
        <IconButton fontSize={fontSize.paragraph} aria-label={`Enviar mensaje a ${title}`}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
      </HStack>
    )
  }
}

export default MessagesID