import { Suspense } from "react"
import { useRouter, useParam, useMutation, BlitzPage } from "blitz"

export const EditIssue = () => {
  return <h1>Edit</h1>
}

const EditIssuePage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <EditIssue />
      </Suspense>
    </>
  )
}

EditIssuePage.authenticate = true
export default EditIssuePage
