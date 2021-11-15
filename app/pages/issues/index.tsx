/**
 *  This is where users that have signed up and are logged in
 *  can see tickets
 * */

import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/queries/getIssues"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

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

const Issues: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)
  return (
    <main>
      <h1>Issue Page</h1>
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

Issues.authenticate = true
Issues.suppressFirstRenderFlicker = true
Issues.getLayout = (page) => <Layout title="Issues">{page}</Layout>

export default Issues
