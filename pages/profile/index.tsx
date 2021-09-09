import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Container, Square } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { User } from "../../components/Card";
import EditableDescription from "../../components/EditableDescription";
import Heading from "../../components/Heading";
import ImagesSlider from "../../components/ImagesSlider";
import Loading from "../../components/Loading";
import { fontSize } from "../../lib/styles";

const Profile: NextPage = () => {
  const [session] = useSession()
  const user = session?.user as User & { images: string } | undefined
  const isLoggedOut = session === null
  const isLoggedIn = session !== undefined && session !== null && user
  useEffect(() => {
    if (isLoggedOut) window.location.replace("/login")
    console.log(user)
  }, [session])
  return (
    <>
      {
        isLoggedIn ?
          <Container>
            <Heading py="1em">{user.name}</Heading>
            <ImagesSlider images={JSON.parse(user.images)} />
            <EditableDescription defaultValue={user.description} />
          </Container>
          :
          <Loading />
      }
    </>
  )
}

export default Profile