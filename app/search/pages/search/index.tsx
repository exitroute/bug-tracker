import { BlitzPage } from "next"

import Layout from "app/core/layouts/Layout"

const Search: BlitzPage = () => {
  return <h1>Search</h1>
}

Search.authenticate = { redirectTo: "/" }
Search.suppressFirstRenderFlicker = true
Search.getLayout = (page) => <Layout title="Search">{page}</Layout>

export default Search
