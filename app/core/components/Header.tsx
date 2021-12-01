import { useQuery } from "blitz"
import { Suspense } from "react"
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
import CreateNewIssueButton from "app/issues/components/CreateNewIssueButton"

const UserButton = ({ onOpen }) => {
  const [user, { isLoading }] = useQuery(getCurrentUser, null)

  if (user) {
    return (
      <Button size="sm" onClick={onOpen}>
        <Skeleton isLoaded={!isLoading}>
          <code>{user.name}</code>
        </Skeleton>
      </Button>
    )
  } else {
    return null
  }
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
          <CreateNewIssueButton />
        </Flex>
      </Box>
    </header>
  )
}

export default Header
