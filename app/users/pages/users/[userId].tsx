import { MouseEvent, Suspense } from "react"
import { BlitzPage, useParam, useQuery, useMutation, Link, Router, useSession } from "blitz"

import { Box, Flex, Button, useColorModeValue } from "@chakra-ui/react"

import {
  Card,
  Property,
  CardHeader,
  CardFooter,
  CardContent,
} from "app/core/components/CardComponents"

import Layout from "app/core/layouts/Layout"
import getUserProfile from "app/users/queries/getUserProfile"
import deleteUserProfile from "app/users/mutations/deleteUserProfile"

const UserProfileDetails = () => {
  const session = useSession()
  const userId = useParam("userId", "number")!
  const [user, { refetch }] = useQuery(getUserProfile, userId)

  const { id, name, email, role, assignedIssues, assignedProjects, inTeams }: any = user

  const redirect = () => {
    refetch()
    Router.push("/users")
  }

  const [deleteUserProfileMutation] = useMutation(deleteUserProfile, { onSuccess: redirect })

  const deleteUserProfileHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    deleteUserProfileMutation({ id })
    confirm("Warning: You are about to delete this user. \nAre you sure?")
  }

  return (
    <Box as="main" height="100%" bg={useColorModeValue("gray.100", "inherit")}>
      <Flex as="section" minH={"100vh"}>
        <Card>
          {session.userId === userId || session.role === "ADMIN" ? (
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
          ) : (
            <CardHeader title={`${name}`} />
          )}
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

          {session.role === "ADMIN" ? (
            <CardFooter
              action={
                <Button colorScheme="pink" onClick={(e) => deleteUserProfileHandler(e, id)}>
                  Delete
                </Button>
              }
            />
          ) : null}
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
UserProfilePage.getLayout = (page) => <Layout title="User">{page}</Layout>

export default UserProfilePage
