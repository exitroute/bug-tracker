import { BlitzPage, Router, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { UserProfileForm } from "app/users/components/UserProfileForm"
import createUser from "app/users/mutations/createUser"

const NewUserPage: BlitzPage = () => {
  const initialValues = { userProfile: { name: "", about: "" } }

  const [createUserMutation] = useMutation(createUser)

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
    </Flex>
  )
}

NewUserPage.authenticate = { redirectTo: "/" }
NewUserPage.suppressFirstRenderFlicker = true
NewUserPage.getLayout = (page) => <DetailsLayout title="New">{page}</DetailsLayout>
export default NewUserPage
