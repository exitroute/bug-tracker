import { Suspense } from "react"
import { BlitzPage, useParam, useQuery, useMutation, Link, Router } from "blitz"

import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  VStack,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import getIssue from "app/issues/queries/getIssue"
import deleteIssue from "app/issues/mutations/deleteIssue"

const IssueDetails = () => {
  const issueId = useParam("issueId", "number")!
  const [issue, { refetch }] = useQuery(getIssue, issueId)
  const [deleteIssueMutation] = useMutation(deleteIssue)

  const deleteIssueHandler = (e, id) => {
    e.preventDefault()
    deleteIssueMutation({ id })
    confirm("Warning: You are about to delete this issue. \nAre you sure?")
    console.log("issue " + id + " deleted")
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
            <Property
              label="Created by"
              value={`${issue?.createdBy.name} on ${issue?.createdAt.toTimeString()}`}
            />
            {issue?.assignedTo && (
              <Property label="Assigned to" value={`${issue?.assignedTo.name}`} />
            )}
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

const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    rounded={{ md: "lg" }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
)

interface Props extends FlexProps {
  label: string
  value: string
}

const Property = (props: Props) => {
  const { label, value, ...flexProps } = props
  return (
    <Flex
      as="dl"
      direction={{ base: "column", sm: "row" }}
      px="6"
      py="4"
      _even={{ bg: useColorModeValue("gray.50", "gray.600") }}
      {...flexProps}
    >
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
    </Flex>
  )
}
interface HeaderProps {
  title: string
  action?: React.ReactNode
}

const CardHeader = (props: HeaderProps) => {
  const { title, action } = props
  return (
    <Flex align="center" justify="space-between" px="6" py="4" borderBottomWidth="1px">
      <Heading fontSize="lg">{title}</Heading>
      {action}
    </Flex>
  )
}

interface FooterProps {
  action?: React.ReactNode
}

const CardFooter = (props: FooterProps) => {
  const { action } = props
  return (
    <Flex align="center" justify="center" px="6" py="4" borderTopWidth="1px">
      {action}
    </Flex>
  )
}

const CardContent = (props: BoxProps) => <Box {...props} />

const IssuePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <IssueDetails />
    </Suspense>
  )
}

IssuePage.authenticate = true
IssuePage.suppressFirstRenderFlicker = true
IssuePage.getLayout = (page) => <DetailsLayout title="Issue">{page}</DetailsLayout>

export default IssuePage
