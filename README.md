## Chamuyapp

Este proyecto está compuesto por dos partes. Este es el Front End (principalmente)

Algunas de las tecnologías usadas:
- Chakra UI
- Next.js
- Next Auth
- GIT
- etc

## Algunas cosas aprendidas durante el camino

- Mejorar mi forma de componer, y crear componentes mas reutilizables. Permitiendo el paso de ...props libremente.
- Aumentar la facilidad a la hora de TABear la página, para personas con limitaciones visuales (y mejores aria-label para orientar sobre el contenido).
- Diferenciar entre el proceso de Auntenticación y el de Autorización. Siendo el primero el que, verificando tus email, contraseña (credenciales), permite que recibas un Identificador. Y el segundo el que decide si el Identificador que tienes te permite ingresar a determinada página.

## Como viajar por este proyecto

Librerías auxiliares:
- apolloClient (Aca esta la conexion con la segunda parte del proyecto, el puro BACKEND. Donde estan registrados los usuarios.)
- queries (Aquí tenemos las queries de GraphQL para el apolloClient)
- styles (Algunos estilos fundamentales, fontSizes, lineHeight, etc)

Contexto:
- showingUser (Se encarga de solicitar al BACKEND, via apolloClient los usuarios que puede ver nuestro usuario, dependiendo de sus preferencias, y de si ya ha votado a dicha persona. En cuyo caso ya no se le mostrara tal usuario. Estos usuarios son desplegados mediante el COMPONENTE CardsSlider)

- user (Aquí puedes solicitar informacion como "isLoggedIn", "isLoggedOut", "user" que sería el objeto usuario)

Componentes:
- CardsSlider (Recibe un Array de objetos usuario y lo despliega conforme a la informacion recibida. Utilizando un COMPONENTE Card para cada uno. Muestra botones para pasar de un slide a otro).
- Card (Recibe un objeto Usuario y lo despliega. Contiene un COMPONENTE ImagesSlider para las imagenes).
- ImagesSlider (Recibe un Array de images (string) y los despliega. Muestra unos botones para pasar de una imagen a otra).
- MatchModal (Aparece cuando ocurre un match y te redirecciona a la pagina /messages)


