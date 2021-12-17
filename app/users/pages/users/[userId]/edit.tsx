import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { UserProfileForm } from "app/users/components/UserProfileForm"

import getInitialUserProfileData from "app/users/queries/getInitialUserProfileData"
import updateUserProfile from "app/users/mutations/updateUserProfile"

export const EditUserProfileForm = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")!

  const [userProfile] = useQuery(getInitialUserProfileData, userId, {
    suspense: false,
    staleTime: Infinity,
  })
  const initialValues = { userProfile }

  const redirect = (updated) => router.push(Routes.UserProfilePage({ userId: updated.id }))
  const [updateUserProfileMutation] = useMutation(updateUserProfile, { onSuccess: redirect })

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading>Edit Issue: {userProfile?.name}</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
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
EditUserProfilePage.getLayout = (page) => <DetailsLayout title="Edit">{page}</DetailsLayout>

export default EditUserProfilePage
