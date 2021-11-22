import { BlitzPage, useParam, useQuery } from "blitz"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getIssue from "app/issues/queries/getIssue"
import EditIssueButton from "app/issues/components/EditIssueButton"

const IssueDetails = () => {
  const issueId = useParam("issueId", "number")!
  const [issue] = useQuery(getIssue, issueId)

  return (
    <main>
      <h1>{issue?.title}</h1>
      <p>{issue?.description}</p>
      <p>
        Created by {issue?.createdBy.email} on {issue?.createdAt.toTimeString()}
      </p>
      <EditIssueButton issueId={issue?.id} />
    </main>
  )
}

const IssuePage: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <IssueDetails />
    </Suspense>
  )
}

IssuePage.authenticate = true
IssuePage.suppressFirstRenderFlicker = true
IssuePage.getLayout = (page) => <Layout title="Issue">{page}</Layout>

export default IssuePage
