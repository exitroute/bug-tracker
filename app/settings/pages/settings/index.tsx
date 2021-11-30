import { BlitzPage } from "next"

import Layout from "app/core/layouts/Layout"

const Settings: BlitzPage = () => {
  return <h1>Your Settings</h1>
}

Settings.authenticate = true
Settings.suppressFirstRenderFlicker = true
Settings.getLayout = (page) => <Layout title="Settings">{page}</Layout>

export default Settings
