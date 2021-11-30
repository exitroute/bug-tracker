/**
 * Where the user can see teams
 */
import Layout from "app/core/layouts/Layout"

import { BlitzPage } from "next"

const Teams: BlitzPage = () => {
  return <h1>Your Teams</h1>
}

Teams.authenticate = true
Teams.suppressFirstRenderFlicker = true
Teams.getLayout = (page) => <Layout title="Teams">{page}</Layout>

export default Teams
