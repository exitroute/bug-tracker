import { Suspense } from "react"
import { BlitzPage, useParam, useQuery, useMutation, Link, Router } from "blitz"

import { Box, Flex, Button, useColorModeValue } from "@chakra-ui/react"

import {
  Card,
  Property,
  CardHeader,
  CardFooter,
  CardContent,
} from "app/core/components/CardComponents"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import getIssue from "app/issues/queries/getIssue"
import deleteIssue from "app/issues/mutations/deleteIssue"

const IssueDetails = () => {
  const issueId = useParam("issueId", "number")!
  const [issue, { refetch }]: any = useQuery(getIssue, issueId)
  const [deleteIssueMutation] = useMutation(deleteIssue)

  const deleteIssueHandler = (e, id) => {
    e.preventDefault()
    deleteIssueMutation({ id })
    confirm("Warning: You are about to delete this issue. \nAre you sure?")
    Router.push("/issues")
    refetch()
  }

  return (
    <Box as="main" height="100%" bg={useColorModeValue("gray.100", "inherit")}>
      <Flex as="section" minH={"100vh"} align={"center"} justify={"center"}>
        <Card maxW="3xl" mx="auto">
          <CardHeader
            title={`${issue?.title} #${issue?.id}`}
            action={
              <Link href={`/issues/${issueId}/edit`}>
                <Button as="a" variant="outline" minW="20">
                  Edit
                </Button>
              </Link>
            }
          />
          <CardContent>
            <Property label="Description" value={`${issue?.description}`} />
            {issue?.assignedTo && (
              <Property label="Assigned to" value={`${issue?.assignedTo.name}`} />
            )}
            {issue?.assignedToProject && (
              <Property label="Project" value={`${issue?.assignedToProject.title}`} />
            )}
            {issue?.assignedToProject.assignedTeam && (
              <Property
                label="Project Team"
                value={`${issue?.assignedToProject.assignedTeam.title}`}
              />
            )}
            <Property
              label="Created by"
              value={`${issue?.createdBy.name} on ${issue?.createdAt.toTimeString()}`}
            />
            {issue?.updatedBy && (
              <Property
                label="Updated by"
                value={`${issue?.updatedBy.name} on ${issue?.updatedAt?.toTimeString()}`}
              />
            )}
          </CardContent>
          <CardFooter
            action={
              <Button colorScheme="pink" onClick={(e) => deleteIssueHandler(e, issueId)}>
                Delete
              </Button>
            }
          />
        </Card>
      </Flex>
    </Box>
  )
}

const IssuePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <IssueDetails />
    </Suspense>
  )
}

IssuePage.authenticate = { redirectTo: "/" }
IssuePage.suppressFirstRenderFlicker = true
IssuePage.getLayout = (page) => <DetailsLayout title="Issue">{page}</DetailsLayout>

export default IssuePage
