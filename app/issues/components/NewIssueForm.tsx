import { useMutation } from "blitz"
import { Form, Field } from "react-final-form"
import createIssue from "app/issues/mutations/createIssue"

export const NewIssueForm = (props) => {
  const [createIssueMutation] = useMutation(createIssue)

  return (
    <Form
      onSubmit={async (values) => {
        try {
          const issue = await createIssueMutation(values)
          props.onSuccess(issue)
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
  )
}

export default NewIssueForm
