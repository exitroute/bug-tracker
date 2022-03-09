import { useRouter, BlitzPage, Routes, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { TeamForm } from "app/teams/components/TeamForm"
import createTeam from "app/teams/mutations/createTeam"

const NewTeamPage: BlitzPage = () => {
  const router = useRouter()
  const initialValues = { team: { title: "", description: "" } }

  const [createTeamMutation] = useMutation(createTeam)
  const onSuccess = (team) => router.push(Routes.TeamPage({ teamId: team.id }))

  return (
    <Flex minH={"100vh"}>
      <Stack spacing={8} mx={"auto"} w="100%" py={12} px={6}>
        <Stack align={"center"}>
          <Heading>Create Team</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            What&apos;s your team?
          </Text>
        </Stack>
        <TeamForm
          onSubmit={async (values) => {
            try {
              const team = await createTeamMutation(values)
              onSuccess(team)
            } catch (error) {
              console.log(error)
            }
          }}
          initialValues={initialValues}
          submitText="Create Team"
        />
      </Stack>
    </Flex>
  )
}

NewTeamPage.authenticate = { redirectTo: "/" }
NewTeamPage.suppressFirstRenderFlicker = true
NewTeamPage.getLayout = (page) => <Layout title="New">{page}</Layout>
export default NewTeamPage
