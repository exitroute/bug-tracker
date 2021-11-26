import { useRouter, BlitzPage, Routes, useMutation } from "blitz"
import DetailsLayout from "app/core/layouts/DetailsLayout"
import { IssueForm } from "app/issues/components/IssueForm"
import createIssue from "app/issues/mutations/createIssue"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()
  const initialValues = { title: "", description: "" }

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
