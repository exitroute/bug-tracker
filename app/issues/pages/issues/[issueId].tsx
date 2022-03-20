import { Suspense } from "react"
import { BlitzPage, useParam, useQuery, useMutation, Link, Router } from "blitz"

import { Box, Flex, Stack, Button, useColorModeValue } from "@chakra-ui/react"

import {
  Card,
  Property,
  CardHeader,
  CardFooter,
  CardContent,
  CardImage,
} from "app/core/components/CardComponents"

import { useAppContext } from "app/context/AppContext"
import Layout from "app/core/layouts/Layout"
import getIssue from "app/issues/queries/getIssue"
import deleteIssue from "app/issues/mutations/deleteIssue"
import getIssuesForCharts from "app/issues/queries/getIssuesForCharts"

const IssueDetails = () => {
  const issueId = useParam("issueId", "number")!
  const [issue, { refetch }] = useQuery(getIssue, issueId)

  const { setChartData } = useAppContext()
  const [data, { refetch: refetchChartData }] = useQuery(getIssuesForCharts, undefined)

  useEffect(() => {
    data && setChartData(data)
  }, [data, setChartData])

  const {
    id,
    title,
    description,
    priority,
    status,
    assignedTo,
    assignedToProject,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    files,
  } = issue

  const [deleteIssueMutation] = useMutation(deleteIssue)

  const deleteIssueHandler = (e, id) => {
    e.preventDefault()
    deleteIssueMutation({ id })
    confirm("Warning: You are about to delete this issue. \nAre you sure?")
    Router.push("/issues")
    refetch()
  }

  return (
    <>
      <Box as="main" height="100%" bg={useColorModeValue("gray.100", "inherit")}>
        <Flex as="section" minH={"100vh"}>
          <Card>
            <CardHeader
              title={`${title} #${id}`}
              action={
                <Link href={`/issues/${issueId}/edit`}>
                  <Button as="a" variant="outline" minW="20">
                    Edit
                  </Button>
                </Link>
              }
            />
            <CardContent>
              <Property label="Description" value={`${description}`} />
              <Property label="Priority" value={`${priority}`} />
              <Property label="Status" value={`${status}`} />
              {assignedTo && <Property label="Assigned to" value={`${assignedTo.name}`} />}
              {assignedToProject && (
                <Property label="Project" value={`${assignedToProject.title}`} />
              )}
              {assignedToProject && assignedToProject.assignedTeam && (
                <Property label="Project Team" value={`${assignedToProject.assignedTeam.title}`} />
              )}
              <Property
                label="Created by"
                value={`${createdBy.name} on ${createdAt.toTimeString()}`}
              />
              {updatedBy && (
                <Property
                  label="Updated by"
                  value={`${updatedBy.name} on ${updatedAt.toTimeString()}`}
                />
              )}
              <Stack align="center">
                {files && files.map((file, i) => <CardImage key={i} src={file.url} />)}
              </Stack>
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
      {/* <pre>{JSON.stringify({ issue }, null, 2)}</pre> */}
    </>
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
IssuePage.getLayout = (page) => <Layout title="Issue">{page}</Layout>

export default IssuePage
