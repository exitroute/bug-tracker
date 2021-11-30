import { BlitzPage } from "next"

import Layout from "app/core/layouts/Layout"

const Projects: BlitzPage = () => {
  return <h1>Your Projects</h1>
}

Projects.authenticate = true
Projects.suppressFirstRenderFlicker = true
Projects.getLayout = (page) => <Layout title="Projects">{page}</Layout>

export default Projects
