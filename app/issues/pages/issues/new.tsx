/**
 * This is where the user makes a new issue
 *
 * [ ] Add redirect to [issue] on success
 *
 */
import { useRouter, BlitzPage, Routes, useMutation } from "blitz"
import { IssueForm } from "app/issues/components/IssueForm"
import createIssue from "app/issues/mutations/createIssue"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()
  const [createIssueMutation] = useMutation(createIssue)
  const initialValues = { title: "", description: "" }
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
export default NewIssuePage
