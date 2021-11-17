/**
 * This is where the user makes a new issue
 */
import { Form, Field } from "react-final-form"
import { BlitzPage, useMutation } from "blitz"
import createIssue from "app/issues/mutations/createIssue"
import { string } from "zod"

const NewIssuePage: BlitzPage = () => {
  const [createIssueMutation] = useMutation(createIssue)

  return (
    <>
      <h1>Create A New Issue</h1>
      <div>
        <Form
          onSubmit={async (values) => {
            try {
              const issue = await createIssueMutation(values)
            } catch (error) {
              console.log(error)
            }
          }}
          initialValues={{
            title: "",
            description: "",
            createdBy: {},
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <br />
                <Field
                  name="title"
                  component="input"
                  type="text"
                  placeholder="Add a descriptive title"
                />
              </div>
              <div>
                <label>Expected behavior</label>
                <br />
                <Field name="description" component="textarea" placeholder="What happened?" />
              </div>
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                Reset
              </button>
            </form>
          )}
        />
      </div>
    </>
  )
}

export default NewIssuePage
