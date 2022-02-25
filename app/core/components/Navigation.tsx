import { ReactNode } from "react"
import { Link } from "blitz"
import { Flex } from "@chakra-ui/react"

const routes = ["Home", "Issues", "Projects", "Users", "Teams"]

const Navigation = () => {
  return (
    <Flex
      as="nav"
      justify="space-around"
      align="center"
      h="4rem"
      display={{ base: "flex", md: "none" }}
    >
      {routes.map((route, index) => (
        <Link key={index} href={`/${route.toLowerCase()}`}>
          <a>{route}</a>
        </Link>
      ))}
    </Flex>
  )
}

export default Navigation
