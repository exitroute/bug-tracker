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
      borderTop="solid 1px"
      borderColor="gray.200"
      boxShadow="0 -4px 6px -1px rgb(0 0 0 / 10%), 0 -2px 4px -1px rgb(0 0 0 / 6%)"
      zIndex="1"
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
