import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery, useSession } from "blitz"

import { Flex, Stack, Heading, Text, Center, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { UserProfileForm } from "app/users/components/UserProfileForm"

import getInitialUserProfileData from "app/users/queries/getInitialUserProfileData"
import updateUserProfile from "app/users/mutations/updateUserProfile"

export const EditUserProfileForm = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")!
  const session = useSession()

  const [userProfile] = useQuery(getInitialUserProfileData, userId, {
    suspense: false,
    staleTime: Infinity,
  })

  const initialValues = { userProfile }

  const redirect = (updated) => router.push(Routes.UserProfilePage({ userId: updated.id }))
  const [updateUserProfileMutation] = useMutation(updateUserProfile, { onSuccess: redirect })

  return (
    <Flex minH={"100vh"}>
      {session.userId === userId || session.role === "ADMIN" ? (
        <Stack spacing={8} mx={"auto"} w={"100%"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading textAlign="center" as="h3" size="md">
              Update User Profile: {userProfile?.name ? `${userProfile?.name}` : ""}
            </Heading>
            <Text fontSize={"md"} color={"gray.600"}>
              What do you want to change?
            </Text>
          </Stack>
          <UserProfileForm
            initialValues={initialValues}
            submitText="Update Issue"
            onSubmit={async (values) => {
              try {
                await updateUserProfileMutation(values)
              } catch (error: any) {
                return { [FORM_ERROR]: error.toString() }
              }
            }}
          />
        </Stack>
      ) : (
        <Center>
          <Heading as="h3" size="md" color="gray.500">
            You cannot edit this user&apos;s data.
          </Heading>
        </Center>
      )}
    </Flex>
  )
}

const EditUserProfilePage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <EditUserProfileForm />
      </Suspense>
    </>
  )
}

EditUserProfilePage.authenticate = { redirectTo: "/" }
EditUserProfilePage.suppressFirstRenderFlicker = true
EditUserProfilePage.getLayout = (page) => <Layout title="Edit">{page}</Layout>

export default EditUserProfilePage
