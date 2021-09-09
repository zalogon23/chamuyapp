import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, HStack, Stack, Wrap } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Divider } from "@chakra-ui/react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import Text from "../../components/Text";

interface Values {
  email: string,
  password: string,
}

const Login: NextPage = () => {
  const [session] = useSession()
  const isLoggedOut = session === null
  const isLoggedIn = session !== undefined && session !== null
  useEffect(() => {
    if (isLoggedIn) window.location.replace("/profile")
  }, [session])
  return (
    <Container>
      {
        isLoggedOut ?
          <>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={values => validate(values)}
              onSubmit={(values) => signIn("credentials", { ...values })}
            >
              {({
                values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Stack px="4" pb="10" spacing="3">
                    <Heading pt="1.5em" pb="1em">Logueate</Heading>
                    <FormControl>
                      <FormLabel htmlFor="email" id="emailLabel">Email:</FormLabel>
                      <Input id="email" borderColor={errors.email && touched.email ? "red.500" : ""} value={values.email} onBlur={handleBlur} onChange={handleChange} name="email" type="email" />
                      <FormHelperText id="emailHelp">{touched.email && errors.email}</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password" id="passwordLabel">Contraseña:</FormLabel>
                      <Input id="password" borderColor={errors.password && touched.password ? "red.500" : ""} value={values.password} onBlur={handleBlur} onChange={handleChange} name="password" type="password" />
                      <FormHelperText id="passwordHelp">{touched.password && errors.password}</FormHelperText>
                    </FormControl>
                    <Button isLoading={isSubmitting} type="submit">Entrar</Button>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Divider borderColor="gray.500" />
            <Text pt="4" pb="6" textAlign="center">o</Text>
            <Wrap justify="center" pb="8">
              <Button flexGrow={1} colorScheme="green" leftIcon={
                <FontAwesomeIcon icon={faCat} />
              } onClick={() => signIn("github")}>Entrar con GitHub</Button>
            </Wrap>
          </>
          :
          <Loading />
      }
    </Container>
  )
  function validate(values: Values): Values {
    const errors = {} as Values;
    if (!values.email) {
      errors.email = 'Debes escribir tu email';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Formato de email incorrecto';
    }
    if (!values.password) {
      errors.password = "Debes escribir una contraseña"
    } else if (values.password.length < 8) {
      errors.password = "Mínimo de 8 caracteres"
    }
    return errors
  }
}

export default Login
