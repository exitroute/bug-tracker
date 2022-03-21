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

import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"
// TODO refactor as delete project

const ProjectDetails = () => {
  const projectId = useParam("projectId", "number")!
  const [project, { refetch }] = useQuery(getProject, projectId)
  const [deleteProjectMutation] = useMutation(deleteProject)

  const deleteProjectHandler = (e, id) => {
    e.preventDefault()
    deleteProjectMutation({ id })
    confirm("Warning: You are about to delete this project. \nAre you sure?")
    console.log("issue " + id + " deleted")
    Router.push("/issues")
    refetch()
  }

  return (
    <>
      <Box as="main" height="100%" bg={useColorModeValue("gray.100", "inherit")}>
        <Flex as="section" minH={"100vh"}>
          <Card>
            <CardHeader
              title={`${project?.title} - Project ID #${project?.id}`}
              action={
                <Link href={`/projects/${projectId}/edit`}>
                  <Button as="a" variant="outline" minW="20">
                    Edit
                  </Button>
                </Link>
              }
            />
            <CardContent>
              <Property label="Description" value={`${project?.description}`} />
              <Property label="Project manager" value={`${project?.assignedTo?.name}`} />
              <Property label="Team" value={`${project?.assignedTeam?.title}`} />
              {project?.assignedIssues.map((issue, index) => (
                <Property key={index} label="Issue" value={`${issue.title}`} />
              ))}
              <Property
                label="Created by"
                value={`${project?.createdBy.name} on ${project?.createdAt.toTimeString()}`}
              />
              {project?.updatedBy && (
                <Property
                  label="Updated by"
                  value={`${project?.updatedBy.name} on ${project?.updatedAt?.toTimeString()}`}
                />
              )}
            </CardContent>
            <CardFooter
              action={
                <Button colorScheme="pink" onClick={(e) => deleteProjectHandler(e, projectId)}>
                  Delete
                </Button>
              }
            />
          </Card>
        </Flex>
      </Box>
    </>
  )
}

const ProjectPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <ProjectDetails />
    </Suspense>
  )
}

ProjectPage.authenticate = { redirectTo: "/" }
ProjectPage.suppressFirstRenderFlicker = true
ProjectPage.getLayout = (page) => <Layout title="Project">{page}</Layout>

export default ProjectPage
