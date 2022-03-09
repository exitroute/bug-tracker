import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import { Flex, Stack, Heading, Text } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { FORM_ERROR } from "app/core/components/AppForm"
import { IssueForm } from "app/issues/components/IssueForm"

import getIssue from "app/issues/queries/getIssue"
import updateIssue from "app/issues/mutations/updateIssue"

export const EditIssueForm = () => {
  const router = useRouter()
  const issueId = useParam("issueId", "number")!

  const [issue] = useQuery(getIssue, issueId, { suspense: false, staleTime: Infinity })
  const initialValues = { issue }

  const redirect = (updated) => router.push(Routes.IssuePage({ issueId: updated.id }))
  const [updateIssueMutation] = useMutation(updateIssue, { onSuccess: redirect })

  return (
    <Flex minH={"100vh"}>
      <Stack spacing={8} mx={"auto"} w="100%" py={12} px={6}>
        <Stack align={"center"}>
          <Heading as="h3" size="lg">
            Edit Issue #{issue?.id}: {issue?.title}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            What do you want to change?
          </Text>
        </Stack>
        <IssueForm
          initialValues={initialValues}
          submitText="Update Issue"
          onSubmit={async (values) => {
            try {
              await updateIssueMutation(values)
            } catch (error: any) {
              return { [FORM_ERROR]: error.toString() }
            }
          }}
        />
      </Stack>
    </Flex>
  )
}

const EditIssuePage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <EditIssueForm />
      </Suspense>
    </>
  )
}

EditIssuePage.authenticate = { redirectTo: "/" }
EditIssuePage.suppressFirstRenderFlicker = true
EditIssuePage.getLayout = (page) => <Layout title="Edit">{page}</Layout>
export default EditIssuePage
