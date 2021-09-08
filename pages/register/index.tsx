import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, HStack, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Heading from "../../components/Heading";
import client from "../../lib/apolloClient";
import queries from "../../lib/queries";

interface Values {
  name: string,
  email: string,
  password: string,
  gender: string,
  age: number | string,
}

const Login: NextPage = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          gender: "woman",
          age: 18
        }}
        validate={values => validate(values)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const result = await client.mutate({
            mutation: queries.register, variables: {
              createUserVariables: { ...values }
            }
          })
          resetForm()
          setSubmitting(false)
          const created = !!result?.data?.createUser?.id || false
          if (created) window.location.replace("/login")
        }}
      >
        {({
          values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Stack px="4" pb="10" spacing="3">
              <Heading pt="1.5em" pb="1em">Registrate</Heading>
              <FormControl>
                <FormLabel htmlFor="name" id="nameLabel">Nombre:</FormLabel>
                <Input id="name" borderColor={errors.name && touched.name ? "red.500" : ""} value={values.name} onBlur={handleBlur} onChange={handleChange} name="name" type="text" />
                <FormHelperText id="nameHelp">{touched.name && errors.name}</FormHelperText>
              </FormControl>
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
              <FormControl>
                <FormLabel htmlFor="age" id="ageLabel">Edad:</FormLabel>
                <Input id="age" borderColor={errors.age && touched.age ? "red.500" : ""} value={values.age} onBlur={handleBlur} onChange={handleChange} name="age" type="number" />
                <FormHelperText id="ageHelp">{touched.age && errors.age}</FormHelperText>
              </FormControl>
              <FormControl pb="6" as="fieldset">
                <FormLabel htmlFor="genderGroup" id="gender" as="legend">Soy:</FormLabel>
                <RadioGroup id="genderGroup" name="gender" value={values.gender}>
                  <HStack spacing="4">
                    <Radio id="radioWoman" onChange={handleChange} name="gender" value="woman">Mujer</Radio>
                    <Radio id="radioMan" onChange={handleChange} name="gender" value="man">Hombre</Radio>
                  </HStack>
                </RadioGroup>
                <FormHelperText id="genderHelp">Elegí el que te represente mas</FormHelperText>
              </FormControl>
              <Button isLoading={isSubmitting} type="submit">Dale!</Button>
            </Stack>
          </Form>
        )}
      </Formik>
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
    if (!values.name) {
      errors.name = "Debes escribir tu nombre"
    }
    if (values.age < 18) {
      errors.age = "Si sos menor de edad no podés registrarte"
    }
    return errors
  }
}

export default Login
