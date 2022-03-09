import { useRouter, BlitzPage, Routes, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { ProjectForm } from "app/projects/components/ProjectForm"
import createProject from "app/projects/mutations/createProject"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const initialValues = { project: { title: "", description: "" } }

  const [createProjectMutation] = useMutation(createProject)
  const onSuccess = (project) => router.push(Routes.ProjectPage({ projectId: project.id }))

  return (
    <Flex minH={"100vh"}>
      <Stack spacing={8} mx={"auto"} w="100%" pt={8}>
        <Stack align={"center"}>
          <Heading as="h3" size="lg">
            Create Project
          </Heading>
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

NewProjectPage.authenticate = { redirectTo: "/" }
NewProjectPage.suppressFirstRenderFlicker = true
NewProjectPage.getLayout = (page) => <Layout title="New">{page}</Layout>
export default NewProjectPage
