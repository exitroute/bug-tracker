import { useQuery, useRouter, useSession, Link } from "blitz"
import { Suspense, useEffect } from "react"
import {
  Box,
  Stack,
  Heading,
  Drawer,
  DrawerContent,
  Button,
  CloseButton,
  Flex,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react"

import Navigation from "../components/Navigation"

import getCurrentUser from "app/users/queries/getCurrentUser"
import LogoutButton from "./LogoutButton"
import CreateNewButton from "app/core/components/CreateNewButton"

const Header = ({ title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex direction="column" justify="space-between" h="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex p="2" as="header" justifyContent={"space-between"} alignItems={"center"}>
        <Suspense fallback={<Skeleton />}>
          <UserButton onOpen={onOpen} />
        </Suspense>
        <Heading textAlign="center">{title}</Heading>
        <CreateNewButton title={title} />
      </Flex>
      <Box
        h="100%"
        overflowY="scroll"
        mx="auto"
        maxWidth={{ base: "80ch", md: "60%" }}
        minWidth={{ base: "100%", md: "60%" }}
      >
        {children}
      </Box>
      <Navigation />
    </Flex>
  )
}

const Sidebar = ({ onClose, ...rest }) => {
  const routes = ["Settings", "Home", "Issues", "Projects", "Users", "Teams"]

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: "20%" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box borderBottomWidth="1px">User Info</Box>
        <CloseButton as="button" display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex h="80vh" direction="column" justify="space-between" px="2">
        <Stack>
          <Link href="./users/new">Edit My Profile</Link>
          {routes.map((route, index) => (
            <Link key={index} href={`/${route.toLowerCase()}`}>
              <a>{route}</a>
            </Link>
          ))}
        </Stack>
        <LogoutButton />
      </Flex>
    </Box>
  )
}

const UserButton = ({ onOpen }) => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (!session.userId) router.push("./login")
  })

  const [user, { isLoading }] = useQuery(getCurrentUser, null)

  const initials = user?.name
    ?.split(" ")
    .map((e) => e.slice(0, 1).toUpperCase())
    .join("")
    .toString()

  const emailInitial = user?.email?.slice(0, 1).toUpperCase()

  return (
    <Button
      size="sm"
      onClick={onOpen}
      colorScheme="blue"
      visibility={{ md: "hidden" }}
      w={{ base: "auto", md: "20%" }}
    >
      <Skeleton isLoaded={!isLoading}>
        <Box
          sx={{
            "@media(min-width: 48em)": { display: "none" },
          }}
        >
          {initials || emailInitial}
        </Box>
        <Box
          sx={{
            "@media(max-width: 48em)": { display: "none" },
          }}
        >
          {user?.name || user?.email}
        </Box>
      </Skeleton>
    </Button>
  )
}

export default Header
