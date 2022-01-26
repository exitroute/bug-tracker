import { Text, Box, Flex, Link, useStyleConfig } from "@chakra-ui/react"

import React from "react"

interface Props {
  id: number
  title: string
  description: string
  assigned?: number | null
  status?: string
}

const getIssueStatus = (assigned) => {
  if (assigned === null) {
    return "UNASSIGNED"
  } else if (assigned) {
    return "ASSIGNED"
  } else {
    return "UNASSIGNED"
  }
  // Add closed
  // Add in progress
  // Add blocked
}

export function ItemCard(props: Props) {
  const { id, title, description, assigned } = props
  const status = getIssueStatus(assigned)
  return (
    <Card p="1rem" _hover={{ background: "gray.100" }}>
      <CardHeader p="12px 5px">
        <Text fontSize="lg" color="gray.500" fontWeight="bold">
          {`#${id} ${title} `}
          <br />
          {`${status}`}
        </Text>
      </CardHeader>
      <CardBody p="0px 2px">
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400">
            {description}
          </Text>
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
