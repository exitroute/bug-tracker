import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
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
  const [updateProjectMutation] = useMutation(updateProject, { onSuccess: redirect })

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading>Edit Project: {project?.title}</Heading>
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
                redirect(updated)
              } catch (error: any) {
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

EditProjectPage.authenticate = true
EditProjectPage.suppressFirstRenderFlicker = true
EditProjectPage.getLayout = (page) => <DetailsLayout title="Edit">{page}</DetailsLayout>
export default EditProjectPage
