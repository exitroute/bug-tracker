import { useRouter, BlitzPage, Routes, useMutation } from "blitz"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { IssueForm } from "app/issues/components/IssueForm"
import createIssue from "app/issues/mutations/createIssue"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()
  const initialValues = { title: "", description: "" }

  const [createIssueMutation] = useMutation(createIssue)
  const onSuccess = (issue) => router.push(Routes.IssuePage({ issueId: issue.id }))

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
              onSuccess(issue)
            } catch (error) {
              console.log(error)
            }
          }}
          initialValues={initialValues}
          submitText="Create Issue"
        />
      </Stack>
    </Flex>
  )
}

NewIssuePage.authenticate = true
NewIssuePage.suppressFirstRenderFlicker = true
NewIssuePage.getLayout = (page) => <DetailsLayout title="New">{page}</DetailsLayout>
export default NewIssuePage
