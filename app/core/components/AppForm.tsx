import { Form as FinalForm } from "react-final-form"
import arrayMutators from "final-form-arrays"

import { Flex, Button } from "@chakra-ui/react"
export { FORM_ERROR } from "final-form"

const validate = (values: any) => {
  interface Errors {
    issue: {
      title?: string
      description?: string
      priority?: string
      status?: string
      files?: string
    }
    project: {
      title?: string
      description?: string
    }
    userProfile: {
      name?: string
      email?: string
    }
  }
  const errors: Errors = { userProfile: {}, issue: {}, project: {} }

  if (values.issue) {
    if (!values.issue.title) {
      errors.issue.title = "Required"
    }
    if (!values.issue.description) {
      errors.issue.description = "Required"
    }
    if (values.issue.status !== "NEW" && !values.issue.assignedTo) {
      errors.issue.status = "Please Assign the Issue"
    }
    if (!values.issue.id && values.issue.files) {
      values.issue.files.map((file) => {
        if (file.errors.length) {
          return (errors.issue.files = "Upload Error")
        }
      })
    }
  }
  if (values.project) {
    if (!values.project.title) {
      errors.project.title = "Required"
    }
    if (!values.project.description) {
      errors.project.description = "Required"
    }
  }
  if (values.userProfile) {
    if (!values.userProfile.name) {
      errors.userProfile.name = "Required"
    }
    if (!values.userProfile.email) {
      errors.userProfile.email = "Required"
    }
  }
  return errors
}

export const Form = ({ children, ...props }) => {
  return (
    <FinalForm
      initialValues={props.initialValues}
      validate={validate}
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={props.onSubmit}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        },
        form,
        errors,
        submitting,
        pristine,
        submitError,
        values,
      }) => (
        <form id="issue-form" onSubmit={handleSubmit}>
          {children}
          {props.submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}
          <Flex justifyContent={"space-evenly"} mt={8}>
            {props.submitText && (
              <Button type="submit" disabled={submitting || pristine}>
                {props.submitText}
              </Button>
            )}

            <Button type="button" onClick={form.reset} disabled={submitting || pristine}>
              Reset
            </Button>
          </Flex>
          {/* <pre>{JSON.stringify({ values, errors }, null, 2)}</pre> */}
        </form>
      )}
    />
  )
}

export default Form
