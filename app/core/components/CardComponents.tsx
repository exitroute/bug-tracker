import { Box, BoxProps, Flex, FlexProps, Heading, useColorModeValue } from "@chakra-ui/react"

export const Card = (props: BoxProps) => (
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

export const Property = (props: Props) => {
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

export const CardHeader = (props: HeaderProps) => {
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

export const CardFooter = (props: FooterProps) => {
  const { action } = props
  return (
    <Flex align="center" justify="center" px="6" py="4" borderTopWidth="1px">
      {action}
    </Flex>
  )
}

export const CardContent = (props: BoxProps) => <Box {...props} />
