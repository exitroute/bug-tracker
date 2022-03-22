import { Text, Box, Flex, useStyleConfig, Stack, Heading } from "@chakra-ui/react"
import { Card, CardHeader, CardBody } from "app/core/components/ItemCardComponents"

import React from "react"

interface Props {
  id: number
  title: string
  description: string
  assigned?: {} | null
  status?: string | null
  priority?: string | null
  tag?: string | null
}

const assignedStatusOutput = (assigned) => {
  if (assigned === null) {
    return "Unassigned"
  } else {
    return assigned.name
  }
}

const progressStatusOutput = (status) => {
  if (status === "IN_PROGRESS") {
    return "IN PROGRESS"
  } else if (status === null) {
    return "Progress not set"
  } else {
    return status
  }
}

const priorityStatusOutput = (priority) => {
  if (priority === null) {
    return "Priority not set"
  } else {
    return priority
  }
}

export function IssueItemCard(props: Props) {
  const { id, title, description, priority, status, assigned, tag } = props

  const assignedStatus = assignedStatusOutput(assigned)
  const displayStatus = progressStatusOutput(status)
  const priorityStatus = priorityStatusOutput(priority)

  return (
    <Card
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      p="1rem"
      _hover={{ background: displayStatus === "CLOSED" ? "gray.300" : "gray.100" }}
      bg={displayStatus === "CLOSED" ? "gray.100" : "white"}
    >
      <CardHeader fontSize="lg" color="gray.500" fontWeight="bold">
        <Heading mb={2} as="h3" size="md">{`${tag ? `${tag} ` : ""}#${id} ${title}`}</Heading>
      </CardHeader>
      <CardBody p="0px 2px" fontSize="md" color="gray.500" fontWeight="400">
        <Stack>
          <Text>
            <strong>{`${assignedStatus}`}</strong>
            <br />
            Progress: <strong>{`${displayStatus}`} </strong>| Priority:{" "}
            <strong>{`${priorityStatus}`}</strong>
          </Text>
          <Text
            sx={{
              "@media(max-width: 480px)": { display: "none" },
            }}
          >
            {description.length > 150 ? `${description.substring(0, 150)}...` : description}
          </Text>
          <Text
            sx={{
              "@media(min-width: 480px)": { display: "none" },
            }}
          >{`${description.substring(0, 50)}...`}</Text>
        </Stack>
      </CardBody>
    </Card>
  )
}
