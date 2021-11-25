import { Suspense } from "react"
import { BlitzPage, Routes, useRouter, useParam, useMutation, useQuery } from "blitz"

import DetailsLayout from "app/core/layouts/DetailsLayout"
import { FORM_ERROR } from "app/issues/components/Form"
import { IssueForm } from "app/issues/components/IssueForm"

import getIssue from "app/issues/queries/getIssue"
import getUsers from "app/users/queries/getUsers"
import updateIssue from "app/issues/mutations/updateIssue"

export const EditIssueForm = () => {
  const router = useRouter()
  const issueId = useParam("issueId", "number")!
  const [users] = useQuery(getUsers, undefined, { suspense: false })
  const [issue] = useQuery(getIssue, issueId)

  const redirect = (updated) => router.push(Routes.IssuePage({ issueId: updated.id }))
  const [updateIssueMutation] = useMutation(updateIssue, { onSuccess: redirect })

  return (
    <>
      <h1>Edit Issue: {issue.title}</h1>
      <IssueForm
        users={users}
        onSubmit={async (values) => {
          try {
            const updated = await updateIssueMutation({
              id: issue.id,
              ...values,
            })
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
EditIssuePage.suppressFirstRenderFlicker = true
EditIssuePage.getLayout = (page) => <DetailsLayout title="Edit">{page}</DetailsLayout>
export default EditIssuePage
