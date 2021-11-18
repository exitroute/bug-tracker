/**
 *  This is where users that have signed up and are logged in
 *  can see tickets
 * */

import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import styles from "./Index.module.css"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/issues/queries/getIssues"

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

const Issues: BlitzPage = () => {
  return (
    <main className={styles.main}>
      <Suspense fallback="Loading issues...">
        <IssueList />
      </Suspense>
    </main>
  )
}

Issues.authenticate = true
Issues.suppressFirstRenderFlicker = true
Issues.getLayout = (page) => <Layout title="Issues">{page}</Layout>

export default Issues
