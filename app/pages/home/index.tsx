import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/queries/getIssues"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

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

const IssueList = () => {
  const [issues] = useQuery(getIssues, undefined)
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

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div>
        User email: <code>{currentUser.email}</code>
        <br />
        User id: <code>{currentUser.id}</code>
        <br />
        User role: <code>{currentUser.role}</code>
      </div>
    )
  } else {
    return null
  }
}

const Home: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)
  return (
    <main>
      <h1>Home page</h1>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <button
        className="button small"
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </button>
      <Suspense fallback="loading">
        <IssueList />
      </Suspense>
    </main>
  )
}

Home.authenticate = true
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
