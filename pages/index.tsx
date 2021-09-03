import type { NextPage } from 'next'
import { Container } from "@chakra-ui/react"
import Text from '../components/Text'
import Heading from '../components/Heading'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <Card
      name="Juan Lucas del Prado"
      images={["https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg"]}
      description="Obrero de la mina de ajotepec, en la cima del monte iguazu" />
  )
}

export default Home
