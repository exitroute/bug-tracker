import { BlitzPage, Router, useMutation, useSession } from "blitz"

import { Flex, Stack, Heading, Text, Center, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { UserProfileForm } from "app/users/components/UserProfileForm"
import createUser from "app/users/mutations/createUser"

const NewUserPage: BlitzPage = () => {
  const initialValues = { userProfile: { name: "", about: "" } }
  const session = useSession()

  const [createUserMutation] = useMutation(createUser)

  return (
    <Flex minH={"100vh"}>
      {session.role === "ADMIN" ? (
        <Stack spacing={8} mx={"auto"} w="100%" py={12} px={6}>
          <Stack align={"center"}>
            <Heading>New User</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Who is joining the team?
            </Text>
          </Stack>
          <UserProfileForm
            onSubmit={async (values) => {
              try {
                const user = await createUserMutation(values)
                Router.push(`/users/${user?.id}`)
              } catch (error) {
                console.error("CREATE USERPROFILE MUTATION ERROR", error)
              }
            }}
            initialValues={initialValues}
            submitText="Create User"
          />
        </Stack>
      ) : (
        <Center w="100%">
          <Heading as="h3" size="md" color="gray.500" textAlign="center">
            You do not have access to this page.
          </Heading>
        </Center>
      )}
    </Flex>
  )
}

NewUserPage.authenticate = { redirectTo: "/" }
NewUserPage.suppressFirstRenderFlicker = true
NewUserPage.getLayout = (page) => <Layout title="New">{page}</Layout>
export default NewUserPage
