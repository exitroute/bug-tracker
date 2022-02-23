import { useQuery, useRouter, useSession, Link } from "blitz"
import { Suspense, useEffect } from "react"
import {
  Box,
  Stack,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react"

import getCurrentUser from "app/users/queries/getCurrentUser"
import LogoutButton from "./LogoutButton"
import CreateNewButton from "app/core/components/CreateNewButton"

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
    <Button size="sm" onClick={onOpen} colorScheme="blue">
      <Skeleton isLoaded={!isLoading}>
        <Box
          sx={{
            "@media(min-width: 480px)": { display: "none" },
          }}
        >
          {initials || emailInitial}
        </Box>
        <Box
          sx={{
            "@media(max-width: 480px)": { display: "none" },
          }}
        >
          {user?.name || user?.email}
        </Box>
      </Skeleton>
    </Button>
  )
}

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <header>
      <Box p={4}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Suspense fallback={<Skeleton />}>
            <UserButton onOpen={onOpen} />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
                <DrawerBody>
                  <LogoutButton />
                  <Stack>
                    <Link href="./settings">Settings</Link>
                    <Link href="./users/new">Edit My Profile</Link>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Suspense>
          <Heading textAlign="center">{props.title}</Heading>
          <CreateNewButton title={props.title} />
        </Flex>
      </Box>
    </header>
  )
}

export default Header
