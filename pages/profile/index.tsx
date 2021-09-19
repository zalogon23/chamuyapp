import { Badge, Container, HStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import EditableDescription from "../../components/EditableDescription";
import Heading from "../../components/Heading";
import ImagesPicker from "../../components/ImagesPicker";
import ImagesSlider from "../../components/ImagesSlider";
import Loading from "../../components/Loading";
import { userContext } from "../../context/user";
import { fontSize } from "../../lib/styles";

const Profile: NextPage = () => {
  const { user, isLoggedIn, isLoggedOut } = useContext(userContext)
  const [mode, setMode] = useState(0)
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(0)
  const [description, setDescription] = useState("")
  const colorScheme = gender === "woman" ? "pink" : "blue"
  const genderIcon = gender === "woman" ? faVenus : faMars
  useEffect(() => {
    if (isLoggedOut) Router.replace("/login")
  }, [isLoggedOut])
  useEffect(() => {
    if (user?.name && user?.description && user?.age && user?.gender) {
      setName(user.name)
      setDescription(user.description)
      setGender(user.gender)
      setAge(user.age)
    }
  }, [user])
  return (
    <>
      {
        isLoggedIn && user && name && description && age && gender ?
          <Container maxW="container.md">
            <Heading py="10">
              <EditableDescription m="0" p="0" defaultValue={name} fontSize={fontSize.heading} />
            </Heading>
            <Tabs index={mode} onChange={i => setMode(i)}>
              <TabList>
                <Tab>Ver</Tab>
                <Tab>Editar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel tabIndex={-1} px="0">
                  <ImagesSlider images={JSON.parse(user.images)} />
                </TabPanel>
                <TabPanel tabIndex={-1} px="0">
                  <ImagesPicker setMode={setMode} images={JSON.parse(user.images)} />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <HStack spacing="2" py="4">
              <Badge fontSize={fontSize.paragraph} colorScheme={colorScheme}>{user.age}</Badge>
              <Badge px="0.5em" fontSize={fontSize.paragraph} colorScheme={colorScheme}>
                <FontAwesomeIcon icon={genderIcon} />
              </Badge>
            </HStack>
            <EditableDescription defaultValue={description} />

          </Container>
          :
          <Loading />
      }
    </>
  )
}

export default Profile