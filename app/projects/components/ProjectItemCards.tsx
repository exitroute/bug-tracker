import { Text, Stack, Heading } from "@chakra-ui/react"
import { Card, CardHeader, CardBody } from "app/core/components/ItemCardComponents"

import React from "react"

interface Props {
  id: number
  title: string
  status?: string
  description: string
  assignedTeam?: { title: string | null } | null
  assignedTo?: { name: string | null } | null
  assignedIssues?: Array<{ [key: string]: any | null }>
}

// Add Project Status to DB and project forms

const progressStatusOutput = (status) => {
  if (status === "IN_PROGRESS") {
    return "IN PROGRESS"
  } else if (status === null) {
    return "Progress not set"
  } else {
    return status
  }
}

const assignedStatusOutput = (assignedTo) => {
  if (assignedTo?.name === null) {
    return "Unassigned"
  } else {
    return assignedTo?.name
  }
}

const assignedTeamStatusOutput = (assignedTeam) => {
  if (assignedTeam?.title === null) {
    return "Unassigned"
  } else {
    return assignedTeam?.title
  }
}

function reducer(arr, property) {
  return arr.reduce((acc, issue) => {
    let key = issue[property]
    if (key in acc) {
      acc[key]++
    } else {
      acc[key] = 1
    }
    return acc
  }, {})
}

export function ProjectItemCard({ props, tag }: any) {
  const { id, title, description, status, assignedTo, assignedTeam, assignedIssues } = props

  const displayStatus = progressStatusOutput(status)
  const displayAssigned = assignedStatusOutput(assignedTo)
  const displayAssignedTeam = assignedTeamStatusOutput(assignedTeam)
  const totalsPriority = reducer(assignedIssues, "priority")
  const totalsStatus = reducer(assignedIssues, "status")

  return (
    <Card
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      p="1rem"
      _hover={{ background: displayStatus === "CLOSED" ? "gray.300" : "gray.100" }}
      bg={displayStatus === "CLOSED" ? "gray.100" : "white"}
    >
      <CardHeader fontSize="lg" color="gray.500" fontWeight="bold">
        <Heading mb={2} as="h3" size="md">{`${tag ? `${tag} ` : ""}#${id} ${title} `}</Heading>
      </CardHeader>
      <CardBody p="0px 2px" fontSize="md" color="gray.500" fontWeight="400">
        <Stack>
          <Text>
            Project manager: <strong>{`${displayAssigned}`}</strong> | Team:{" "}
            <strong>{`${displayAssignedTeam}`}</strong>
            <br />
            Progress: <strong>{`${displayStatus}`} </strong>
            <br />
            Issues: <strong>{assignedIssues.length}</strong> | Priority:{" "}
            <strong>
              {Object.entries(totalsPriority).map(([key, value]) => `${key}: ${value}, `)}
            </strong>{" "}
            | Progress:{" "}
            <strong>
              {Object.entries(totalsStatus).map(
                ([key, value]) => `${progressStatusOutput(key)}: ${value}, `
              )}
            </strong>
          </Text>
          <Text
            sx={{
              "@media(max-width: 480px)": { display: "none" },
            }}
          >
            {description?.length > 150 ? `${description.substring(0, 150)}...` : description}
          </Text>
          <Text
            sx={{
              "@media(min-width: 480px)": { display: "none" },
            }}
          >{`${description?.substring(0, 50)}...`}</Text>
        </Stack>
      </CardBody>
    </Card>
  )
}
