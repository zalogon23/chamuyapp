import { Square } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { User } from "../../components/Card";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";

const Profile: NextPage = () => {
  const [session] = useSession()
  const user = session?.user as User | undefined
  useEffect(() => {
    console.log(session)
    if (session === null) window.location.replace("/login")
  }, [session])
  return (
    <>
      {
        user ?
          <>
            <Heading>{user.name}</Heading>
          </>
          :
          <Loading />
      }
    </>
  )
}

export default Profile