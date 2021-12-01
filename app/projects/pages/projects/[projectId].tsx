import { Suspense } from "react"
import { BlitzPage, useParam, useQuery, useMutation, Link, Router } from "blitz"

import DetailsLayout from "app/core/layouts/DetailsLayout"

import getProject from "app/projects/queries/getProject"

const ProjectDetails = () => {
  const projectId = useParam("projectId", "number")!
  const [project, { refetch }] = useQuery(getProject, projectId)

  return <pre>{JSON.stringify(project, null, 2)}</pre>
}

const ProjectPage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <ProjectDetails />
    </Suspense>
  )
}

ProjectPage.authenticate = true
ProjectPage.suppressFirstRenderFlicker = true
ProjectPage.getLayout = (page) => <DetailsLayout title="Project">{page}</DetailsLayout>

export default ProjectPage
