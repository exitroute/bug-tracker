import { ReactNode } from "react"
import { Link } from "blitz"
import { Box, Flex } from "@chakra-ui/react"

const routes = ["Home", "Projects", "Users", "Teams"]

const Navigation = () => {
  return (
    <Box>
      <Flex justifyContent="space-around">
        {routes.map((route, index) => (
          <Link key={index} href={`/${route.toLowerCase()}`}>
            <a>{route}</a>
          </Link>
        ))}
      </Flex>
    </Box>
  )
}

export default Navigation
