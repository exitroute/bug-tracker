import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"

import getProjects from "app/projects/queries/getProjects"
import Layout from "app/core/layouts/Layout"

const ProjectList = () => {
  const [items] = useQuery(getProjects, undefined)
  return (
    <Box>
      <UnorderedList styleType="none">
        {items?.map((item) => (
          <ListItem key={item.id}>
            {/* <Link href={Routes.ProjectPage({ projectId: item.id })}> */}
            <a>{item.title}</a>
            {/* </Link> */}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

const Projects: BlitzPage = () => {
  return (
    <Box as="main" h="100%" pos="relative">
      <Suspense fallback="Loading projects...">
        <ProjectList />
      </Suspense>
    </Box>
  )
}

Projects.authenticate = true
Projects.suppressFirstRenderFlicker = true
Projects.getLayout = (page) => <Layout title="Projects">{page}</Layout>

export default Projects
