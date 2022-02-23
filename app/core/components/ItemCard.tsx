import { Text, Box, Flex, Grid, GridItem, useStyleConfig } from "@chakra-ui/react"

import React from "react"

interface Props {
  id: number
  title: string
  description: string
  assigned?: {} | null
  status?: string | null
  priority?: string | null
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

export function ItemCard(props: Props) {
  const { id, title, description, priority, status, assigned } = props

  const assignedStatus = assignedStatusOutput(assigned)
  const displayStatus = progressStatusOutput(status)
  const priorityStatus = priorityStatusOutput(priority)

  return (
    <Card p="1rem" px={{ base: "0rem" }} _hover={{ background: "gray.100" }}>
      <CardHeader p="12px 5px" fontSize="lg" color="gray.500" fontWeight="bold">
        {`#${id} ${title} `}
      </CardHeader>
      <CardBody p="0px 2px" fontSize="md" color="gray.500" fontWeight="400">
        <Flex direction="column">
          <Text>
            <strong>{`${assignedStatus}`}</strong>
            <br />
            Progress: <strong>{`${displayStatus}`} </strong>| Priority:{" "}
            <strong>{`${priorityStatus}`}</strong>
          </Text>
          <Text>{description.substring(0, 50)}...</Text>
        </Flex>
      </CardBody>
    </Card>
  )
}

function Card(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("Card", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

function CardHeader(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("CardHeader", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

function CardBody(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("CardBody", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}
