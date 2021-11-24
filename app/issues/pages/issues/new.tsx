import { useRouter, BlitzPage, Routes, useQuery, useMutation } from "blitz"
import DetailsLayout from "app/core/layouts/DetailsLayout"
import { IssueForm } from "app/issues/components/IssueForm"
import createIssue from "app/issues/mutations/createIssue"
import getUsers from "app/users/queries/getUsers"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()
  const [users] = useQuery(getUsers, undefined, { suspense: false })
  const initialValues = { users: users }

  const [createIssueMutation] = useMutation(createIssue)
  const onSuccess = (issue) => router.push(Routes.IssuePage({ issueId: issue.id }))

  return (
    <>
      <h1>Create A New Issue</h1>
      <div>
        <IssueForm
          onSubmit={async (values) => {
            try {
              const issue = await createIssueMutation(values)
              onSuccess(issue)
            } catch (error) {
              console.log(error)
            }
          }}
          initialValues={initialValues}
          submitText="Create Issue"
        />
      </div>
    </>
  )
}

NewIssuePage.authenticate = true
NewIssuePage.suppressFirstRenderFlicker = true
NewIssuePage.getLayout = (page) => <DetailsLayout title="New">{page}</DetailsLayout>
export default NewIssuePage
