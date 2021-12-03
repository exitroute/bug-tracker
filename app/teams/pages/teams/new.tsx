import { useRouter, BlitzPage, Routes, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { TeamForm } from "app/teams/components/TeamForm"
import createTeam from "app/teams/mutations/createTeam"

const NewTeamPage: BlitzPage = () => {
  const router = useRouter()
  const initialValues = { title: "", description: "" }

  const [createTeamMutation] = useMutation(createTeam)
  const onSuccess = (team) => router.push(Routes.TeamPage({ teamId: team.id }))

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading>Create Team</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            What do you want to report?
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

NewTeamPage.authenticate = true
NewTeamPage.suppressFirstRenderFlicker = true
NewTeamPage.getLayout = (page) => <DetailsLayout title="New">{page}</DetailsLayout>
export default NewTeamPage
