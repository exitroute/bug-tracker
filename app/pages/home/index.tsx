import { Suspense } from "react"
import { Image, Link, BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/queries/getIssues"

/**
 * this is where the user arrives after logging in
 *
 * In the feed user sees their
 *  active tickets
 *  projects
 *  team
 *
 * and any unassigned tickets
 *
 * The user can
 *  go to their profile
 *  go to search
 *  go to users
 *  go to tickets
 *
 */

const HomeList = () => {
  const [issues] = useQuery(getIssues, undefined)
  // This list also returns projects and teams
  return (
    <ul>
      {issues.map((issue) => (
        <Link key={issue.id} href={Routes.IssuePage({ issueId: issue.id })}>
          <a>
            <li>{issue.title}</li>
          </a>
        </Link>
      ))}
    </ul>
  )
}

const Home: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback="Loading your data...">
        <HomeList />
      </Suspense>
    </main>
  )
}

Home.authenticate = true
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
