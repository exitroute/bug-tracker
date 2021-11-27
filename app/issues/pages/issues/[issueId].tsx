import { BlitzPage, useParam, useQuery, useMutation, Link, Router } from "blitz"
import { Suspense } from "react"
import DetailsLayout from "app/core/layouts/DetailsLayout"
import getIssue from "app/issues/queries/getIssue"
import deleteIssue from "app/issues/mutations/deleteIssue"

const IssueDetails = () => {
  const issueId = useParam("issueId", "number")!
  const [issue, { refetch }] = useQuery(getIssue, issueId)
  const [deleteIssueMutation] = useMutation(deleteIssue)

  const deleteIssueHandler = (e, id) => {
    e.preventDefault()
    deleteIssueMutation({ id })
    confirm("Warning: You are about to delete this issue. \nAre you sure?")
    console.log("issue " + id + " deleted")
    Router.push("/issues")
    refetch()
  }

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
      <br />
      <button onClick={(e) => deleteIssueHandler(e, issueId)}>Delete</button>
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
