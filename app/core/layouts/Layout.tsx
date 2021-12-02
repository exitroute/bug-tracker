import { Head, BlitzLayout } from "blitz"
import { Flex, Box } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" justify="space-between" h="100vh" mx="auto" maxW="80ch">
        <Header title={title} />
        <Box h="100%" overflowY="scroll">
          {children}
        </Box>
        <Navigation />
      </Flex>
    </>
  )
}

export default Layout
