import { createContext, ReactElement, useState } from "react";
import { User } from "../components/Card";


interface Props {
  children: ReactElement | ReactElement[]
}

interface Context {
  users: User[],
  currentUser: number,
  loading: boolean,
  like: { (): void },
  dislike: { (): void },
}

const showingUsersContext = createContext({} as Context)

export function ShowingUsersProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState(0)
  const loading = false
  const [users, setUsers] = useState([
    {
      id: 2,
      name: "Juan Lucas del Prado",
      images: [
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
      ],
      description: "Obrero de la mina de ajotepec, en la cima del monte iguazu"
    },
    {
      id: 3,
      name: "Juan Lucas del Prado",
      images: [
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
      ],
      description: "Obrero de la mina de ajotepec, en la cima del monte iguazu"
    },
    {
      id: 3,
      name: "Juan Lucas del Prado",
      images: [
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
        "https://st4.depositphotos.com/4507459/25236/i/1600/depositphotos_252362736-stock-photo-siberian-tiger-hunting-prey-fowl.jpg",
      ],
      description: "Obrero de la mina de ajotepec, en la cima del monte iguazu"
    },
  ])
  return (
    <showingUsersContext.Provider value={{
      users,
      loading,
      currentUser,
      like,
      dislike
    }}>
      {children}
    </showingUsersContext.Provider>
  )

  function like(): void {
    console.log("You like this guy (talking with server...): ", users[currentUser])
    if (currentUser === users.length - 1) {
      console.log("Now it should fetch more users")
      //Fetches
      setCurrentUser(0)
    } else {
      setCurrentUser(currentUser + 1)
    }
  }

  function dislike(): void {
    console.log("You DISlike this guy (talking with server...): ", users[currentUser])
    if (currentUser === users.length - 1) {
      console.log("Now it should fetch more users")
      //Fetches
      setCurrentUser(0)
    } else {
      setCurrentUser(currentUser + 1)
    }
  }
}

export { showingUsersContext }