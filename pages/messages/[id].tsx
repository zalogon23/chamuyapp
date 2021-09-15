import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import { messagesContext } from "../../context/messages";
import { userContext } from "../../context/user";

interface Message {
  content: string,
  id: number,
  createdAt: Date,
  receiverID: number,
  senderID: number
}

const MessagesID: NextPage = () => {
  const { isLoggedOut } = useContext(userContext)
  const { matchesMessages, matchesNoMessages } = useContext(messagesContext)
  const [messages, setMessages] = useState([] as Message[])
  useEffect(() => {
    const pathname = window?.location.pathname
    const id = Number(pathname.slice(pathname.indexOf("/", 1) + 1))
    if (id) {
      if (matchesMessages.length) {
        const currentMessages = JSON.parse(matchesMessages.find(match => match.id === id)?.content || "[]") as Message[]
        if (!Boolean(currentMessages?.length)) Router.replace("/messages")
        setMessages(currentMessages)
      }
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
        messages.length ?
          <Heading>Algo</Heading>
          :
          <Loading />
      }
    </>
  )
}

export default MessagesID