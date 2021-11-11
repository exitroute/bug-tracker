import { BlitzPage, useParam, useQuery } from "blitz"
import { Suspense } from "react"
import getIssue from "app/queries/getIssue"

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

export default IssuePage
