import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { ProjectForm } from "app/projects/components/ProjectForm"

import getProject from "app/projects/queries/getProject"
import updateProject from "app/projects/mutations/updateProject"

export const EditProjectForm = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")!

  const [project] = useQuery(getProject, projectId, { suspense: false, staleTime: Infinity })
  const initialValues = { project }
  const [updateProjectMutation] = useMutation(updateProject)

  const redirect = (updated) => router.push(Routes.ProjectPage({ projectId: updated.id }))

  return (
    <>
      <Flex minH={"100vh"}>
        <Stack spacing={8} mx={"auto"} w="100%" py={12} px={6}>
          <Stack align={"center"}>
            <Heading as="h3" size="lg">
              Edit Project #{project?.id}: {project?.title}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              What do you want to change?
            </Text>
          </Stack>
          <ProjectForm
            initialValues={initialValues}
            submitText="Update Project"
            onSubmit={async (values) => {
              try {
                const updated = await updateProjectMutation({
                  ...values,
                })
                redirect(updated)
              } catch (error: any) {
                return { [FORM_ERROR]: error.toString() }
              }
            }}
          />
        </Stack>
      </Flex>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </>
  )
}

const EditProjectPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <EditProjectForm />
      </Suspense>
    </>
  )
}

EditProjectPage.authenticate = { redirectTo: "/" }
EditProjectPage.suppressFirstRenderFlicker = true
EditProjectPage.getLayout = (page) => <Layout title="Edit">{page}</Layout>
export default EditProjectPage
