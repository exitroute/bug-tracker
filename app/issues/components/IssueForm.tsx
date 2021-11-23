import { Suspense } from "react"
import { useQuery } from "blitz"
import { Field } from "react-final-form"
import { Form } from "./Form"
export { FORM_ERROR } from "./Form"
// todo get users and add to field with users
import getUsers from "app/users/queries/getUsers"

export const IssueForm = (props) => {
  const [users] = useQuery(getUsers, undefined, { suspense: false })
  console.log(users)

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
          <Field name="users" component="select" multiple id="assign-user">
            {users?.map((user) => (
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
