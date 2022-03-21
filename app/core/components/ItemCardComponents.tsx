import React from "react"

import { Box, useStyleConfig } from "@chakra-ui/react"

export function Card(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("Card", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export function CardHeader(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("CardHeader", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export function CardBody(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("CardBody", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}
