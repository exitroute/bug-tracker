import { Link, useParam, useQuery } from "blitz"
import React from "react"
import getIssue from "app/issues/queries/getIssue"

const EditIssueButton = () => {
  const issueId = useParam("issueId", "number")!
  const [issue] = useQuery(getIssue, issueId)

  return (
    <div>
      <Link href={`${issue.id}/edit`}>
        <a>Update Issue</a>
      </Link>
    </div>
  )
}

export default EditIssueButton
