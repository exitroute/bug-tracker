import { useRouter, BlitzPage, Routes, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { ProjectForm } from "app/projects/components/ProjectForm"
import createProject from "app/projects/mutations/createProject"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const initialValues = { project: { title: "", description: "" } }

  const [createProjectMutation] = useMutation(createProject)
  const onSuccess = (project) => router.push(Routes.ProjectPage({ projectId: project.id }))

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading>Create Project</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            What&apos;s the goal?
          </Text>
        </Stack>
        <ProjectForm
          onSubmit={async (values) => {
            try {
              const issue = await createProjectMutation(values)
              onSuccess(issue)
            } catch (error: any) {
              return { [FORM_ERROR]: error.toString() }
            }
          }}
          initialValues={initialValues}
          submitText="Create Project"
        />
      </Stack>
    </Flex>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.suppressFirstRenderFlicker = true
NewProjectPage.getLayout = (page) => <DetailsLayout title="New">{page}</DetailsLayout>
export default NewProjectPage
