import { Suspense } from "react"
import { BlitzPage, useRouter, useParam, useMutation, useQuery } from "blitz"

import { FORM_ERROR } from "app/issues/components/Form"
import { IssueForm } from "app/issues/components/IssueForm"

import getIssue from "app/issues/queries/getIssue"
import updateIssue from "app/issues/mutations/updateIssue"

export const EditIssueForm = () => {
  const router = useRouter()
  const issueId = useParam("issueId", "number")!
  const [issue, { setQueryData }] = useQuery(getIssue, issueId, { staleTime: Infinity })
  const [updateIssueMutation] = useMutation(updateIssue)

  return (
    <>
      <h1>Edit Issue: {issue.title}</h1>
      <pre>{JSON.stringify(issue, null, 2)}</pre>
      <IssueForm
        submitText="Update Issue"
        initialValues={issue}
        onSubmit={async (values) => {
          try {
            const updated = await updateIssueMutation({
              id: issue.id,
              ...values,
            })
            await setQueryData(updated)
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      />
    </>
  )
}

const EditIssuePage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <EditIssueForm />
      </Suspense>
    </>
  )
}

EditIssuePage.authenticate = true
export default EditIssuePage
