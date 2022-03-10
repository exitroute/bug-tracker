import { useQuery, useRouter, useSession, Link as BlitzLink } from "blitz"
import { Suspense, useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext"

import {
  Box,
  Text,
  Stack,
  Heading,
  Drawer,
  DrawerContent,
  Button,
  CloseButton,
  Flex,
  Link,
  Skeleton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react"

import { GrBarChart, GrFilter } from "react-icons/gr"

import Navigation from "../components/Navigation"

import getCurrentUser from "app/users/queries/getCurrentUser"
import LogoutButton from "./LogoutButton"
import CreateNewButton from "app/core/components/CreateNewButton"

const Header = ({ title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = useState<any>("")
  const { onToggle } = useAppContext()

  const chartSideBarEventHandler = () => {
    setPlacement("right")
    onOpen()
  }

  const sideBarEventHandler = () => {
    setPlacement("left")
    onOpen()
  }

  return (
    <Flex direction="column" justify="space-between" h="100vh">
      <Sidebar onClose={onClose} display={{ base: "none", md: "block" }} title={title} />
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          {placement === "left" ? (
            <Sidebar onClose={onClose} title={title} />
          ) : (
            <ChartsSidebar onClose={onClose} />
          )}
        </DrawerContent>
      </Drawer>
      <Flex
        p="2"
        as="header"
        justifyContent={{ base: "space-between" }}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
      >
        <Flex marginLeft={{ md: "calc(20% + 1rem)" }} alignItems="center">
          <Suspense fallback={<Skeleton />}>
            <UserButton onOpen={onOpen} sideBarEventHandler={sideBarEventHandler} />
          </Suspense>
          <Heading size="lg" ml={{ base: 4, md: 0 }}>
            {title}
          </Heading>
        </Flex>

        <Box mr={{ md: "calc(20%)" }}>
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Open filter list"
            w="auto"
            size="sm"
            fontSize={{ base: "sm", md: "md" }}
            icon={<GrFilter />}
            mr={{ base: 2, md: "none" }}
            onClick={onToggle}
          />
          <IconButton
            display={{ base: "inline-flex", md: "none" }}
            variant="outline"
            colorScheme="teal"
            aria-label="Open charts"
            fontSize={{ base: "sm", md: "md" }}
            size="sm"
            icon={<GrBarChart />}
            mr={2}
            onClick={chartSideBarEventHandler}
          />
          <CreateNewButton title={title} display={{ base: "inline-flex", md: "none" }} />
        </Box>
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

      {/* Charts */}

      <ChartsSidebar
        display={{ base: "none", md: "block" }}
        pos="fixed"
        top="0px"
        left="80%"
        onClose={onClose}
      />
    </Flex>
  )
}

const Sidebar = ({ onClose, title, ...rest }) => {
  const [user] = useQuery(getCurrentUser, null, {
    suspense: false,
    staleTime: Infinity,
  })

  const routes = ["Home", "Issues", "Projects", "Users", "Teams"]

  return (
    <Box
      as="nav"
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
        <Box borderBottomWidth="1px">{user?.name}</Box>
        <CloseButton as="button" display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex h="80vh" direction="column" justify="space-between" px="2">
        <Stack>
          <BlitzLink href={`/users/${user?.id}`}>
            <Link>My Profile</Link>
          </BlitzLink>
          <BlitzLink href="/settings">
            <Link>Settings</Link>
          </BlitzLink>
          {routes.map((route, index) => (
            <BlitzLink key={index} href={`/${route.toLowerCase()}`}>
              <Link display={{ base: "none", md: "inline" }}>{route}</Link>
            </BlitzLink>
          ))}
          <CreateNewButton title={title} display={{ base: "none", md: "inline-flex" }} />
        </Stack>
        <LogoutButton />
      </Flex>
    </Box>
  )
}

const ChartsSidebar = ({ onClose, ...rest }) => {
  return (
    <Box
      as="aside"
      h="full"
      w={{ base: "full", md: "20%" }}
      borderLeft="1px"
      borderLeftColor="gray.200"
      bg="white"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Heading as="h2" size="md" textAlign="center">
          Charts
        </Heading>
        <CloseButton as="button" display={{ base: "flex", md: "none" }} onClick={onClose} />{" "}
      </Flex>
      <Flex h="50%" direction="column" justify="center" alignItems="center">
        <Text textAlign="center">Charts coming soon</Text>
      </Flex>
    </Box>
  )
}

const UserButton = ({ onOpen, sideBarEventHandler }) => {
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
      onClick={sideBarEventHandler}
      colorScheme="blue"
      display={{ md: "none" }}
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
