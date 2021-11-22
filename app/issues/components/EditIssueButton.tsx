import { Link, Routes } from "blitz"
import React from "react"

const EditIssueButton = ({ issueId }) => {
  return (
    <div>
      <Link href={`${issueId}/edit`}>
        <a>Update Issue</a>
      </Link>
    </div>
  )
}

export default EditIssueButton
