import { Field } from "react-final-form"
import { Form } from "./Form"
export { FORM_ERROR } from "./Form"

export const IssueForm = (props) => {
  console.log("issueForm", props)
  return (
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
    </Form>
  )
}
