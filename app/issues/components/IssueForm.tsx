import { Suspense } from "react"
import { useQuery } from "blitz"

import { Field, FieldRenderProps } from "react-final-form"
import { InputControl, TextareaControl, SelectControl } from "app/core/components/FormComponents"

import { Box, Stack, useColorModeValue } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

import getUsers from "app/users/queries/getUserProfiles"

export const IssueForm = (props) => {
  const [users] = useQuery(getUsers, undefined, { suspense: false })

  return (
    <Suspense fallback="Loading...">
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
        <Stack spacing={4}>
          <Form {...props}>
            <Stack spacing={8}>
              <InputControl
                name="issue.title"
                placeholder="Add a descriptive title"
                label="Title"
              />
              <TextareaControl
                name="issue.description"
                placeholder="What did you expect to happen?"
                label="Expected Behaviour"
              />
              <SelectControl
                name="issue.assignedTo.id"
                label="Assigned to"
                placeholder="Assign this issue!"
              >
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </SelectControl>
              <div>
                <Field name="issue.priority" type="radio" value="URGENT" component={Radio}>
                  Urgent
                </Field>
              </div>
              <div>
                <label>
                  <Field name="issue.priority" type="radio" value="HIGH" component={Radio} />
                  High
                </label>
              </div>
              <div>
                <Field name="issue.priority" type="radio" value="NORMAL" component={Radio}>
                  Normal
                </Field>
              </div>
              <div>
                <label>
                  <Field name="issue.priority" type="radio" value="LOW" component={Radio} />
                  Low
                </label>
              </div>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}

interface RProps extends FieldRenderProps<string, HTMLInputElement> {}

const Radio: React.FC<RProps> = ({ input, children }) =>
  // input should contain checked value to indicate
  // if the input is checked
  {
    console.log(input)
    return (
      <label>
        <input type="radio" {...input} />
        {children}
      </label>
    )
  }
