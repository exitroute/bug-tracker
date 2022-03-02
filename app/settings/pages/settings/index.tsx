import { BlitzPage } from "next"

import { Center, Flex, Heading } from "@chakra-ui/layout"

import Layout from "app/core/layouts/Layout"

const Settings: BlitzPage = () => {
  return (
    <Flex direction="column" justifyContent="center" height="100%">
      <Center>
        <Heading as="h3" size="md" color="gray.500">
          The settings page is under construction
        </Heading>
      </Center>
    </Flex>
  )
}

Settings.authenticate = { redirectTo: "/" }
Settings.suppressFirstRenderFlicker = true
Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
