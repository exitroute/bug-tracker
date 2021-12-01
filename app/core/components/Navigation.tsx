import { ReactNode } from "react"
import { Link } from "blitz"
import { Box, Flex } from "@chakra-ui/react"

const routes = ["Home", "Issues", "Projects", "Users", "Teams"]

const Navigation = () => {
  return (
    <Flex as="nav" justify="space-around" alignItems="flex-end" h="100%" pb="4" pt="4">
      {routes.map((route, index) => (
        <Link key={index} href={`/${route.toLowerCase()}`}>
          <a>{route}</a>
        </Link>
      ))}
    </Flex>
  )
}

export default Navigation
