import { MouseEvent, Suspense } from "react"
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
import getUserProfile from "app/users/queries/getUserProfile"
import deleteUserProfile from "app/users/mutations/deleteUserProfile"

const UserProfileDetails = () => {
  const userId = useParam("userId", "number")!
  const [user, { refetch }]: any = useQuery(getUserProfile, userId)
  const [deleteUserProfileMutation] = useMutation(deleteUserProfile)

  const { id, name, email, role, assignedIssues, assignedProjects, inTeams } = user

  const deleteUserProfileHandler = (e, id: any) => {
    e.preventDefault()
    deleteUserProfileMutation({ id })
    confirm("Warning: You are about to delete this user. \nAre you sure?")
    refetch()
    Router.push("/users")
  }

  return (
    <Box as="main" height="100%" bg={useColorModeValue("gray.100", "inherit")}>
      <Flex as="section" minH={"100vh"} align={"center"} justify={"center"}>
        <Card>
          <CardHeader
            title={`${name}`}
            action={
              <Link href={`/users/${userId}/edit`}>
                <Button as="a" variant="outline" minW="20">
                  Edit
                </Button>
              </Link>
            }
          />
          <CardContent>
            <Property label="Role" value={`${role}`} />
            <Property label="Email" value={`${email}`} />
            {assignedIssues &&
              assignedIssues.map((issue, index) => (
                <Property key={index} label="Issue" value={`${issue.title}`} />
              ))}
            {assignedProjects &&
              assignedProjects.map((project, index) => (
                <Property key={index} label="Project" value={`${project.title}`} />
              ))}
            {inTeams &&
              inTeams.map((team, index) => (
                <Property key={index} label="Team" value={`${team.title}`} />
              ))}
          </CardContent>
          <CardFooter
            action={
              <Button colorScheme="pink" onClick={(e) => deleteUserProfileHandler(e, id)}>
                Delete
              </Button>
            }
          />
        </Card>
      </Flex>
    </Box>
  )
}

const UserProfilePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <UserProfileDetails />
    </Suspense>
  )
}

UserProfilePage.authenticate = { redirectTo: "/" }
UserProfilePage.suppressFirstRenderFlicker = true
UserProfilePage.getLayout = (page) => <DetailsLayout title="User">{page}</DetailsLayout>

export default UserProfilePage
