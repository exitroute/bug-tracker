import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { TeamForm } from "app/teams/components/TeamForm"

import getInitialTeamData from "app/teams/queries/getIntialTeamData"
import updateTeam from "app/teams/mutations/updateTeam"

export const EditTeamForm = () => {
  const router = useRouter()
  const teamId = useParam("teamId", "number")!

  const [team, { refetch }] = useQuery(getInitialTeamData, teamId, {
    suspense: false,
    staleTime: Infinity,
  })
  const initialValues = { team }

  const redirect = (updated) => router.push(Routes.TeamPage({ teamId: updated.id }))
  const [updateTeamMutation] = useMutation(updateTeam, { onSuccess: redirect })

  return (
    <>
      <Flex minH={"100vh"}>
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
                refetch()
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

EditTeamPage.authenticate = { redirectTo: "/" }
EditTeamPage.suppressFirstRenderFlicker = true
EditTeamPage.getLayout = (page) => <Layout title="Edit">{page}</Layout>
export default EditTeamPage
