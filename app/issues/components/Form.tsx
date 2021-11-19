import { useMutation } from "blitz"
import { Form as FinalForm, Field } from "react-final-form"
export { FORM_ERROR } from "final-form"

export const Form = ({ children, ...props }) => {
  console.log(props)
  return (
    <FinalForm
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      render={({ handleSubmit, form, submitting, pristine, submitError }) => (
        <form onSubmit={handleSubmit}>
          {children}

          {props.submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {props.submitText && (
            <button type="submit" disabled={submitting || pristine}>
              {props.submitText}
            </button>
          )}

          <button type="button" onClick={form.reset} disabled={submitting || pristine}>
            Reset
          </button>
        </form>
      )}
    />
  )
}

export default Form
