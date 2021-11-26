import { Form as FinalForm } from "react-final-form"
export { FORM_ERROR } from "final-form"

export const Form = ({ children, ...props }) => {
  console.log(props.initialValues.issue)
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

          <button type="button" onClick={form.reset} disabled={submitting || pristine}>
            Reset
          </button>
        </form>
      )}
    />
  )
}

export default Form
