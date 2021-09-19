import { Button, IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
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
import client from "../../lib/apolloClient";
import queries from "../../lib/queries";
import { fontSize } from "../../lib/styles";

const Profile: NextPage = () => {
  const { user, isLoggedIn, isLoggedOut } = useContext(userContext)
  const [mode, setMode] = useState(0)
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(0)
  const [description, setDescription] = useState("")
  const [changed, setChanged] = useState(false)
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
              <EditableDescription onSubmit={newName => {
                if (newName !== user.name) {
                  setChanged(true)
                  setName(newName)
                }
              }} m="0" p="0" defaultValue={name} fontSize={fontSize.heading} />
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
              <Editable aria-label="Cambiar edad" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                h="2.5rem" w="2.5rem" bg={`${colorScheme}.500`} p="1" onSubmit={val => {
                  if (Number(val) > 18) {
                    setAge(Number(val))
                  }
                }} defaultValue={`${age}`}>
                <EditablePreview />
                <EditableInput textAlign="center" type="number" />
              </Editable>
              <IconButton w="2.5rem" h="2.5rem" aria-label={`Cambiar genero a ${gender === "woman" ? "hombre" : "mujer"}`}
                onClick={() => {
                  setGender(gender === "woman" ? "man" : "woman")
                }} px="0.5em" fontSize={fontSize.paragraph} colorScheme={colorScheme}>
                <FontAwesomeIcon icon={genderIcon} />
              </IconButton>
            </HStack>
            <EditableDescription onSubmit={newDescription => {
              if (newDescription !== description) {
                setChanged(true)
                setDescription(newDescription)
              }
            }}
              defaultValue={description} />

            {getAnyDifference() && changed && (
              <Button fontSize={fontSize.paragraph} mt="5" mb="10" w="100%"
                aria-label="Confirmar cambios"
                onClick={updateUser}>Confirmar cambios</Button>
            )}
          </Container>
          :
          <Loading />
      }
    </>
  )

  function getAnyDifference() {
    return (
      description !== user?.description
      || name !== user?.name
      || gender !== user?.gender
      || age !== user?.age
    )
  }

  function updateUser() {
    client.mutate({
      mutation: queries.editUser, variables: {
        editUserVariables: {
          id: user.id ?? null,
          name: name !== user.name ? name : null,
          description: description !== user.description ? description : null,
          age: age !== user.age ? age : null,
          gender: gender !== user.gender ? gender : null
        }
      }
    })
    setChanged(false)
  }
}

export default Profile