import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"

import getProjects from "app/projects/queries/getProjects"
import Layout from "app/core/layouts/Layout"

const ProjectList = () => {
  const [projects] = useQuery(getProjects, undefined)
  return (
    <Box>
      <UnorderedList styleType="none">
        {projects?.map((project) => (
          <ListItem key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <a>{project.title}</a>
            </Link>
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
