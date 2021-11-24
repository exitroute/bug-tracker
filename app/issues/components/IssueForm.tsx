import { Suspense } from "react"
import { Field } from "react-final-form"
import { Form } from "./Form"
export { FORM_ERROR } from "./Form"

export const IssueForm = (props) => {
  return (
    <Suspense fallback="Loading...">
      <Form {...props}>
        <div>
          <label>Title</label>
          <br />
          <Field name="title" component="input" type="text" placeholder="Add a descriptive title" />
        </div>
        <div>
          <label>Expected behavior</label>
          <br />
          <Field name="description" component="textarea" placeholder="What happened?" />
        </div>
        <div>
          <label htmlFor="assign-user">Assigned to</label>
          <br />
          {}
          <Field name="assignedTo" component="select" id="assign-user">
            <option value="">--Select--</option>
            {props.initialValues.users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Field>
        </div>
      </Form>
    </Suspense>
  )
}
