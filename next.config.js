/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    CLIENT_ID_GITHUB: "Iv1.07959572315df8ac",
    CLIENT_SECRET_GITHUB: "3f629d49083fd23404a628ad34648bc33a7ac87e",
    GRAPHQL_URL: "https://chamuyappadmin.herokuapp.com/graphql"
  },
  async redirects() {
    return [
      {
        source: "/users([^\/]*)",
        destination: "/",
        permanent: true
      },
      {
        source: "/perfil([^\/]*)",
        destination: "/profile",
        permanent: true
      },
      {
        source: "/mensajes([^\/]*)",
        destination: "/messages",
        permanent: true
      },
      {
        source: "/chat([^\/]*)",
        destination: "/messages",
        permanent: true
      },
    ]
  }
}
