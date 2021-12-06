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
import getTeam from "app/teams/queries/getTeam"
import deleteTeam from "app/teams/mutations/deleteTeam"

const TeamDetails = () => {
  const teamId = useParam("teamId", "number")!
  const [team, { refetch }] = useQuery(getTeam, teamId)
  const [deleteTeamMutation] = useMutation(deleteTeam)

  const deleteTeamHandler = (e, id) => {
    e.preventDefault()
    deleteTeamMutation({ id })
    confirm("Warning: You are about to delete this team. \nAre you sure?")
    console.log("team " + id + " deleted")
    Router.push("/teams")
    refetch()
  }

  return (
    <>
      <Box as="main" height="100%" bg={useColorModeValue("gray.100", "inherit")}>
        <Flex as="section" minH={"100vh"} align={"center"} justify={"center"}>
          <Card maxW="3xl" mx="auto">
            <CardHeader
              title={`${team?.title} #${team?.id}`}
              action={
                <Link href={`/teams/${teamId}/edit`}>
                  <Button as="a" variant="outline" minW="20">
                    Edit
                  </Button>
                </Link>
              }
            />
            <CardContent>
              <Property label="Description" value={`${team?.description}`} />
              <Property
                label="Created by"
                value={`${team?.createdBy.name} on ${team?.createdAt.toTimeString()}`}
              />
              {team?.updatedBy && (
                <Property
                  label="Updated by"
                  value={`${team?.updatedBy.name} on ${team?.updatedAt?.toTimeString()}`}
                />
              )}
              {team?.members.map((member, index) => (
                <Property key={index} label="Member" value={`${member.name}`} />
              ))}
              {team?.assignedProjects.map((project, index) => (
                <Property key={index} label="Project" value={`${project.title}`} />
              ))}
            </CardContent>
            <CardFooter
              action={
                <Button colorScheme="pink" onClick={(e) => deleteTeamHandler(e, teamId)}>
                  Delete
                </Button>
              }
            />
          </Card>
        </Flex>
      </Box>
      <pre>{JSON.stringify(team, null, 2)}</pre>
    </>
  )
}

const TeamPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <TeamDetails />
    </Suspense>
  )
}

TeamPage.authenticate = true
TeamPage.suppressFirstRenderFlicker = true
TeamPage.getLayout = (page) => <DetailsLayout title="Team">{page}</DetailsLayout>

export default TeamPage
