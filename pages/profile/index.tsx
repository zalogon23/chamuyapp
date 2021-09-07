import { Square } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { User } from "../../components/Card";
import Heading from "../../components/Heading";

const Profile: NextPage = () => {
  const [session] = useSession()
  const data = session?.data as User | undefined
  useEffect(() => {
    if (data === undefined) window.location.replace("/register")
  }, [data])
  return (
    <>
      {
        data ?
          <>
            <Heading>{data.name}</Heading>
          </>
          :
          <Square minH="90vh">
            <Spinner size="xl" />
          </Square>
      }
    </>
  )
}

export default Profile