import { Head, BlitzLayout } from "blitz"
import React from "react"
import { Flex, Box } from "@chakra-ui/react"
import DetailsHeader from "app/core/components/DetailsHeader"

const DetailsLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <Box maxW="80ch" mx="auto" height="100vh">
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailsHeader title={title} />
      <Box overflowY="scroll">{children}</Box>
    </Box>
  )
}

export default DetailsLayout
