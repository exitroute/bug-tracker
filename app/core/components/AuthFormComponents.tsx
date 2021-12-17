import {
  Box,
  Heading,
  Text,
  BoxProps,
  useColorModeValue,
  chakra,
  HTMLChakraProps,
} from "@chakra-ui/react"

export const ForgotPasswordLayout = ({ children }) => (
  <Box
    bg={useColorModeValue("gray.50", "inherit")}
    minH="100vh"
    py="12"
    px={{ base: "4", lg: "8" }}
  >
    <Box maxW="md" mx="auto">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Password Reset
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Please enter your email.</Text>
      </Text>
      <Card>{children}</Card>
    </Box>
  </Box>
)

export const SignUpLayout = ({ children }) => (
  <Box
    bg={useColorModeValue("gray.50", "inherit")}
    minH="100vh"
    py="12"
    px={{ base: "4", lg: "8" }}
  >
    <Box maxW="md" mx="auto">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign up
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Creating an account is free!</Text>
        <br />
        <Link href="./login">Already have an account?</Link>
      </Text>
      <Card>{children}</Card>
    </Box>
  </Box>
)

export const LoginLayout = ({ children }) => (
  <Box
    bg={useColorModeValue("gray.50", "inherit")}
    minH="100vh"
    py="12"
    px={{ base: "4", lg: "8" }}
  >
    <Box maxW="md" mx="auto">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign in to your account
      </Heading>
      <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        <Text as="span">Don&apos;t have an account?</Text>
        <br />
        <Link href="./signup">Creating an account is free!</Link>
      </Text>
      <Card>{children}</Card>
    </Box>
  </Box>
)

const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    py="8"
    px={{ base: "4", md: "10" }}
    shadow="base"
    rounded={{ sm: "lg" }}
    {...props}
  />
)

const Link = (props: HTMLChakraProps<"a">) => (
  <chakra.a
    marginStart="1"
    href="#"
    color={useColorModeValue("blue.500", "blue.200")}
    _hover={{ color: useColorModeValue("blue.600", "blue.300") }}
    display={{ base: "block", sm: "inline" }}
    {...props}
  />
)
