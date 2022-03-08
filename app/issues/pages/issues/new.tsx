import { BlitzPage, Router, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import { IssueForm } from "app/issues/components/IssueForm"
import createIssue from "app/issues/mutations/createIssue"

const NewIssuePage: BlitzPage = () => {
  const initialValues = { issue: { priority: "NORMAL", status: "NEW" } }

  const [createIssueMutation] = useMutation(createIssue)

  return (
    <Flex minH={"100vh"}>
      <Stack spacing={8} mx={"auto"} w="100%" pt={8}>
        <Stack align={"center"}>
          <Heading>Create Issue</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            What do you want to report?
          </Text>
        </Stack>
        <IssueForm
          onSubmit={async (values) => {
            try {
              const issue = await createIssueMutation(values)
              Router.push(`/issues/${issue?.id}`)
            } catch (error) {
              console.error("CREATE ISSUE MUTATION ERROR", error)
            }
          }}
          initialValues={initialValues}
          submitText="Create Issue"
        />
      </Stack>
    </Flex>
  )
}

NewIssuePage.authenticate = { redirectTo: "/" }
NewIssuePage.suppressFirstRenderFlicker = true
NewIssuePage.getLayout = (page) => <Layout title="New">{page}</Layout>
export default NewIssuePage
