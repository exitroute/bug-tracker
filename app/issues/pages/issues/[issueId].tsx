import { BlitzPage, useParam, useQuery, Link } from "blitz"
import { Suspense } from "react"
import DetailsLayout from "app/core/layouts/DetailsLayout"
import getIssue from "app/issues/queries/getIssue"

const IssueDetails = () => {
  const issueId = useParam("issueId", "number")!
  const [issue] = useQuery(getIssue, issueId)

  return (
    <main>
      <h1>{issue?.title}</h1>
      <p>{issue?.description}</p>
      <p>
        Created by {issue?.createdBy.name} on {issue?.createdAt.toTimeString()}
      </p>
      {issue?.assignedTo && <p>Assigned to {issue?.assignedTo.name}</p>}
      {issue?.updatedBy && (
        <p>
          Updated by {issue.updatedBy?.name} on {issue?.updatedAt?.toTimeString()}
        </p>
      )}
      <Link href={`/issues/${issueId}/edit`}>
        <a>Update Issue</a>
      </Link>
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
IssuePage.getLayout = (page) => <DetailsLayout title="Issue">{page}</DetailsLayout>

export default IssuePage
