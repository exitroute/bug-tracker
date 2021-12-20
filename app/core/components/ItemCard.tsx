import { Text, Box, Flex, Link, useStyleConfig } from "@chakra-ui/react"

import React from "react"

interface Props {
  id: number
  title: string
  description: string
}

export function ItemCard(props: Props) {
  const { id, title, description } = props
  return (
    <Card p="1rem" _hover={{ background: "gray.100" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color="gray.500" fontWeight="bold">
          {`#${id} ${title}`}
        </Text>
      </CardHeader>
      <CardBody p="0px 5px">
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
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
