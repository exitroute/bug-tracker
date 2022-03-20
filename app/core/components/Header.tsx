import { useQuery, useRouter, useSession, Link as BlitzLink } from "blitz"
import React, { Suspense, useEffect, useState } from "react"
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
import { ChartsSidebar } from "app/core/components/ChartsSidebar"

import getCurrentUser from "app/users/queries/getCurrentUser"
import LogoutButton from "./LogoutButton"
import CreateNewButton from "app/core/components/CreateNewButton"

const Header = ({ title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = useState<any>("")
  const { onToggle, isFilterOpen } = useAppContext()

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
            <ChartsSidebar
              onClose={onClose}
              pos={{ md: "fixed" }}
              top={{ md: "0px" }}
              left={{ md: "80%" }}
            />
          )}
        </DrawerContent>
      </Drawer>
      <Flex
        p="1rem"
        as="header"
        justifyContent={{ base: "space-between" }}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        mx={{ md: "auto" }}
        w={{ base: "100%", md: "60%" }}
        zIndex="1"
        boxShadow={isFilterOpen ? "none" : "md"}
      >
        <Flex alignItems="center">
          <Suspense fallback={<Skeleton />}>
            <UserButton onOpen={onOpen} sideBarEventHandler={sideBarEventHandler} />
          </Suspense>
          <Heading size="lg" ml={{ base: 4, md: 0 }}>
            {title}
          </Heading>
        </Flex>

        <Flex alignItems="center">
          <IconButton
            display={title === "Issues" ? "inline-flex" : "none"}
            variant="outline"
            colorScheme="teal"
            aria-label="Open filter list"
            size="sm"
            fontSize={{ base: "sm", md: "md" }}
            icon={<GrFilter />}
            mr={{ base: 2, md: "0px" }}
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
        </Flex>
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
      <Suspense fallback="Loading...">
        <ChartsSidebar
          display={{ base: "none", md: "block" }}
          pos="fixed"
          top="0px"
          left="80%"
          onClose={onClose}
        />
      </Suspense>
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
      <Flex py="1rem" justifyContent="center" alignItems="center" w="100%">
        <Heading size="lg">bgTrckr</Heading>
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        h="20"
        py={{ md: "2rem" }}
        alignItems="center"
        mx={{ base: "8", md: "auto" }}
        justifyContent={{ base: "space-between", md: "center" }}
        fontWeight="bold"
        size="lg"
      >
        <Box borderBottomWidth="1px">{user?.name}</Box>
        <CloseButton as="button" onClick={onClose} />
      </Flex>
      <Flex
        h={{ base: "70vh", md: "80vh" }}
        direction="column"
        justify="space-between"
        px="1rem"
        pt="1rem"
      >
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
        <Stack w="100%">
          <Text size="lg" textAlign="center" display={{ base: "none", md: "block" }}>
            {user?.name}
          </Text>
          <LogoutButton />
        </Stack>
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
