import { Badge, Container, HStack } from "@chakra-ui/layout";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect } from "react";
import EditableDescription from "../../components/EditableDescription";
import Heading from "../../components/Heading";
import ImagesSlider from "../../components/ImagesSlider";
import Loading from "../../components/Loading";
import { userContext } from "../../context/user";
import { fontSize } from "../../lib/styles";

const Profile: NextPage = () => {
  const { session, user, isLoggedIn, isLoggedOut } = useContext(userContext)
  const colorScheme = user?.gender === "woman" ? "pink" : "blue"
  const genderIcon = user?.gender === "woman" ? faVenus : faMars
  useEffect(() => {
    if (isLoggedOut) Router.replace("/login")
    console.log(user)
  }, [session])
  return (
    <>
      {
        isLoggedIn && user ?
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