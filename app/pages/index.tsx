import { Link, BlitzPage, Routes } from "blitz"

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
  Icon,
  Link as ChakLink,
} from "@chakra-ui/react"
import { GrGithub, GrLinkedin } from "react-icons/gr"
import { ExternalLinkIcon } from "@chakra-ui/icons"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const LandingPage: BlitzPage = () => {
  return (
    <div className="container">
      <CallToActionWithAnnotation />
    </div>
  )
}

const CallToActionWithAnnotation = () => {
  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between" h="100vh">
        <Flex justifyContent="space-between" borderBottom="1px" borderBottomColor="gray.200">
          <Flex
            h="100%"
            pl={{ base: "2", sm: "4", md: "8" }}
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={{ base: "sm", sm: "lg", md: "xl" }} fontWeight="bold">
              BugTwitter
            </Text>
          </Flex>
          <Stack
            direction={"row"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            p={{ base: "2", sm: "4", md: "8" }}
          >
            <Link href={Routes.SignupPage()}>
              <Button
                as="a"
                colorScheme={"blue"}
                bg={"blue.400"}
                rounded={"lg"}
                px={{ base: "3", sm: "6" }}
                fontSize={{ base: "sm", sm: "md" }}
                _hover={{
                  bg: "green.500",
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link href={Routes.LoginPage()}>
              <Button
                as="a"
                colorScheme={"blue"}
                bg={"blue.400"}
                rounded={"lg"}
                px={{ base: "3", sm: "6" }}
                fontSize={{ base: "sm", sm: "md" }}
                _hover={{
                  bg: "green.500",
                }}
              >
                Login
              </Button>
            </Link>
          </Stack>
        </Flex>
        <Container centerContent maxW="container.lg">
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 4, md: 8 }}
            // py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "5xl", md: "8xl" }}
              lineHeight={"105%"}
            >
              A bit like Jira
              <br />
              <Text as={"span"} color={"blue.400"}>
                A bit like Twitter
              </Text>
            </Heading>

            <Text color={"gray.500"} lineHeight="116%">
              A demo project by Ryan O&apos;Shea
              <br /> Find out how it is built{" "}
              <ChakLink href="https://ryanoshea.dev/blog/how-i-made-bugtwitter" isExternal>
                here <ExternalLinkIcon />
              </ChakLink>
            </Text>
          </Stack>
        </Container>
        <Flex justifyContent="center" w="100%">
          <Box p={4}>
            <a href="https://github.com/exitroute/bug-tracker">
              <Icon as={GrGithub} w={6} h={6} />
            </a>
          </Box>
          <Box p={4}>
            <a href="https://www.linkedin.com/in/ryanjamesoshea/">
              <Icon as={GrLinkedin} w={6} h={6} />
            </a>
          </Box>
          <Box p={4}>
            <a href="https://ryanoshea.dev/">ryanoshea.dev</a>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

LandingPage.suppressFirstRenderFlicker = true
LandingPage.redirectAuthenticatedTo = "/home"

export default LandingPage
