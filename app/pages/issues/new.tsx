/**
 * This is where the user makes a new issue
 *
 * [ ] Add redirect to [issue] on success
 *
 */
import { useRouter, BlitzPage, Routes } from "blitz"
import NewIssueForm from "app/issues/components/NewIssueForm"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <h1>Create A New Issue</h1>
      <div>
        <NewIssueForm onSuccess={(issue) => router.push(Routes.IssuePage({ issueId: issue.id }))} />
      </div>
    </>
  )
}

NewIssuePage.authenticate = true
NewIssuePage.suppressFirstRenderFlicker = true
export default NewIssuePage
