import { Form as FinalForm } from "react-final-form"
import { Flex, Button } from "@chakra-ui/react"
export { FORM_ERROR } from "final-form"

export const Form = ({ children, ...props }) => {
  return (
    <FinalForm
      initialValues={props.initialValues.issue}
      onSubmit={props.onSubmit}
      render={({ handleSubmit, form, submitting, pristine, submitError }) => (
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
        </form>
      )}
    />
  )
}

export default Form
