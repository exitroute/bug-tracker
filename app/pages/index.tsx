import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import getIssues from "app/queries/getIssues"
import IssuePage from "./issues/[issueId]"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User email: <code>{currentUser.email}</code>
          <br />
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

Routes.IssuePage
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

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <IssueList />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
