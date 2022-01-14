import { useQuery, useRouter, useSession } from "blitz"
import { Suspense, useEffect } from "react"
import {
  Box,
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

  return (
    <Button size="sm" onClick={onOpen}>
      <Skeleton isLoaded={!isLoading}>
        <code>{user?.name || user?.email}</code>
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
                  <p>Some contents...</p>
                  <p>Some contents...</p>
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
