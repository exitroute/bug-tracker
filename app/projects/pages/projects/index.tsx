import { BlitzPage } from "next"

import Layout from "app/core/layouts/Layout"
import { Box } from "@chakra-ui/layout"

const Projects: BlitzPage = () => {
  return (
    <Box as="main" h="100%" pos="relative">
      <div>
        <ul>
          <li>New projects!</li>
          <li>New projects!</li>
          <li>New projects!</li>
          <li>New projects!</li>
          <li>New projects!</li>
        </ul>
      </div>
    </Box>
  )
}

Projects.authenticate = true
Projects.suppressFirstRenderFlicker = true
Projects.getLayout = (page) => <Layout title="Projects">{page}</Layout>

export default Projects
