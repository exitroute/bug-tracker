/**
 * This is where a user sees all the user profiles
 */

import Layout from "app/core/layouts/Layout"

import { BlitzPage } from "blitz"

const Users: BlitzPage = () => {
  return <h1>User List!!!!!</h1>
}

Users.authenticate = true
Users.suppressFirstRenderFlicker = true
Users.getLayout = (page) => <Layout title="Users">{page}</Layout>

export default Users
