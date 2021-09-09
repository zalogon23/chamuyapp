import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Badge, Container, HStack, Square } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const colorScheme = user?.gender === "woman" ? "pink" : "blue"
  const genderIcon = user?.gender === "woman" ? faVenus : faMars
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
            <HStack spacing="2" py="4">
              <Badge fontSize={fontSize.paragraph} colorScheme={colorScheme}>{user.age}</Badge>
              <Badge px="0.5em" fontSize={fontSize.paragraph} colorScheme={colorScheme}>
                <FontAwesomeIcon icon={genderIcon} />
              </Badge>
            </HStack>
            <EditableDescription defaultValue={user.description} />
          </Container>
          :
          <Loading />
      }
    </>
  )
}

export default Profile