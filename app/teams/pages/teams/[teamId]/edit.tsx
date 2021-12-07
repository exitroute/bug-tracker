import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { TeamForm } from "app/teams/components/TeamForm"

import getTeam from "app/teams/queries/getTeam"
import updateTeam from "app/teams/mutations/updateTeam"

export const EditTeamForm = () => {
  const router = useRouter()
  const teamId = useParam("teamId", "number")!

  const [team] = useQuery(getTeam, teamId, { suspense: false, staleTime: Infinity })
  const initialValues = { team }

  const redirect = (updated) => router.push(Routes.TeamPage({ teamId: updated.id }))
  const [updateTeamMutation] = useMutation(updateTeam, { onSuccess: redirect })

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading>Edit Team: {team?.title}</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              What do you want to change?
            </Text>
          </Stack>
          <TeamForm
            initialValues={initialValues}
            submitText="Update Team"
            onSubmit={async (values) => {
              try {
                await updateTeamMutation(values)
              } catch (error: any) {
                return { [FORM_ERROR]: error.toString() }
              }
            }}
          />
        </Stack>
      </Flex>
      <pre>{JSON.stringify(team, null, 2)}</pre>
    </>
  )
}

const EditTeamPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <EditTeamForm />
      </Suspense>
    </>
  )
}

EditTeamPage.authenticate = true
EditTeamPage.suppressFirstRenderFlicker = true
EditTeamPage.getLayout = (page) => <DetailsLayout title="Edit">{page}</DetailsLayout>
export default EditTeamPage
