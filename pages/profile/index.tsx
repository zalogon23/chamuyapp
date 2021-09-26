import { Button, IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Badge, Container, HStack, Wrap } from "@chakra-ui/layout";
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
import Text from "../../components/Text";
import { userContext } from "../../context/user";
import client from "../../lib/apolloClient";
import queries from "../../lib/queries";
import { fontSize } from "../../lib/styles";
import { showingUsersContext } from "../../context/showingUsers"
import SEOHead from "../../components/SEOHead";

const Profile: NextPage = () => {
  const { user, isLoggedIn, isLoggedOut, setUser } = useContext(userContext)
  const { searchUsers } = useContext(showingUsersContext)
  const [mode, setMode] = useState(0)
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [genderPreference, setGenderPreference] = useState("")
  const [age, setAge] = useState(0)
  const [maxAgePreference, setMaxAgePreference] = useState(35)
  const [minAgePreference, setMinAgePreference] = useState(18)
  const [description, setDescription] = useState("")
  const [changed, setChanged] = useState(false)
  const colorScheme = gender === "woman" ? "pink" : "blue"
  const genderIcon = gender === "woman" ? faVenus : faMars
  useEffect(() => {
    if (isLoggedOut) Router.replace("/login")
  }, [isLoggedOut])
  useEffect(() => {
    if (user?.name && user?.description && user?.age && user?.gender && user?.genderPreference) {
      setName(user.name)
      setDescription(user.description)
      setGender(user.gender)
      setGenderPreference(user.genderPreference)
      setAge(user.age)
      setMinAgePreference(user.minAgePreference ?? 18)
      setMaxAgePreference(user.maxAgePreference ?? 35)
    }
  }, [user])
  return (
    <>
      <SEOHead
        title="Tu Perfil"
        keywords="ligar chamuyar editar perfil romance choque y fuga pareja sexo casual amor conocer hobbies gustos"
        description="Muestra tu lado mas emotivo, tus hobbies, tus aventuras, cuenta un poco sobre ti."
      />
      {
        isLoggedIn && user && name && description && age && gender ?
          <Container maxW="container.md" pb="12">
            <Heading py={["4", "6", "10"]}>
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
              <Wrap>
                <HStack p="4" border="1px solid" borderColor="gray.300" rounded="md">
                  <Text>Tu información:</Text>
                  <Editable aria-label="Cambiar edad" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                    h="2.5rem" w="2.5rem" bg={`${colorScheme}.500`} p="1" onSubmit={val => {
                      if (Number(val) > 17) {
                        setChanged(true)
                        setAge(Number(val))
                      }
                    }} defaultValue={`${age}`}>
                    <EditablePreview />
                    <EditableInput textAlign="center" type="number" />
                  </Editable>
                  <IconButton w="2.5rem" h="2.5rem" aria-label={`Cambiar genero a ${gender === "woman" ? "hombre" : "mujer"}`}
                    onClick={() => {
                      setChanged(true)
                      setGender(gender === "woman" ? "man" : "woman")
                    }} px="0.5em" fontSize={fontSize.paragraph} colorScheme={colorScheme}>
                    <FontAwesomeIcon icon={genderIcon} />
                  </IconButton>
                </HStack>
                <HStack p="4" border="1px solid" borderColor="gray.300" rounded="md">
                  <Text>Busco: </Text>
                  <IconButton w="2.5rem" h="2.5rem" aria-label={`Cambiar mi preferencia de genero a ${genderPreference === "woman" ? "hombre" : "mujer"}`}
                    onClick={() => {
                      setChanged(true)
                      setGenderPreference(genderPreference === "woman" ? "man" : "woman")
                    }} px="0.5em" fontSize={fontSize.paragraph} colorScheme={genderPreference === "woman" ? "pink" : "blue"}>
                    <FontAwesomeIcon icon={genderPreference === "woman" ? faVenus : faMars} />
                  </IconButton>
                  <Text>Entre: </Text>
                  <HStack>
                    <Editable aria-label="Cambiar preferencia edad minima" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                      h="2.5rem" w="2.5rem" bg={`${genderPreference === "woman" ? "pink" : "blue"}.500`} p="1" onChange={val => {
                        if (Number(val) > 17 && Number(val) < maxAgePreference) {
                          setChanged(true)
                          setMinAgePreference(Number(val))
                        }
                      }} defaultValue={`${minAgePreference}`}>
                      <EditablePreview />
                      <EditableInput textAlign="center" type="number" />
                    </Editable>
                    <Text>{"-"}</Text>
                    <Editable aria-label="Cambiar preferencia edad maxima" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                      h="2.5rem" w="2.5rem" bg={`${genderPreference === "woman" ? "pink" : "blue"}.500`} p="1" onChange={val => {
                        if (Number(val) > minAgePreference && Number(val) < 130) {
                          setChanged(true)
                          setMaxAgePreference(Number(val))
                        }
                      }} defaultValue={`${maxAgePreference}`}>
                      <EditablePreview />
                      <EditableInput textAlign="center" type="number" />
                    </Editable>
                  </HStack>
                </HStack>
              </Wrap>
            </HStack>
            <EditableDescription onSubmit={newDescription => {
              if (newDescription !== description) {
                setChanged(true)
                setDescription(newDescription)
              }
            }}
              defaultValue={description} />

            {getAnyDifference() && changed && (
              <Button fontSize={fontSize.paragraph} mt="5" w="100%"
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
      || genderPreference !== user?.genderPreference
      || age !== user?.age
      || minAgePreference !== user?.minAgePreference
      || maxAgePreference !== user?.maxAgePreference
    )
  }

  async function updateUser() {
    const preferencesChanges = genderPreference !== user.genderPreference ||
      minAgePreference !== user?.minAgePreference ||
      maxAgePreference !== user?.maxAgePreference

    setUser({ ...user, name, description, age, genderPreference, gender })
    await client.mutate({
      mutation: queries.editUser, variables: {
        editUserVariables: {
          id: user.id ?? null,
          name: name !== user.name ? name : null,
          description: description !== user.description ? description : null,
          age: age !== user.age ? age : null,
          gender: gender !== user.gender ? gender : null,
          genderPreference: genderPreference !== user.genderPreference ? genderPreference : null,
          minAgePreference: minAgePreference !== user.minAgePreference ? minAgePreference : null,
          maxAgePreference: maxAgePreference !== user.maxAgePreference ? maxAgePreference : null,
        }
      }
    })
    if (preferencesChanges) searchUsers()
    setChanged(false)
  }
}

export default Profile