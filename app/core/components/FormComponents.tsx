import { Field, useField } from "react-final-form"

import { Input, Textarea, Select, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"

export const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return <FormControl {...rest} isInvalid={error && touched} />
}

export const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } })
  return <FormErrorMessage>{error}</FormErrorMessage>
}

export const InputControl = ({ name, placeholder, label }) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...input} isInvalid={meta.error && meta.touched} placeholder={placeholder} />
      <Error name={label} />
    </Control>
  )
}

export const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
)

export const TextareaControl = ({ name, placeholder, label }) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name} component={AdaptedTextarea} placeholder={placeholder} />
      <Error name={label} />
    </Control>
  )
}

export const SelectControl = ({ name, label, children, placeholder, ...props }) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name}>
      <FormLabel htmlFor={name} />
      <Select placeholder={placeholder} id={name} {...input} isInvalid={meta.error && meta.touched}>
        {children}
      </Select>
      <FormErrorMessage>{name}</FormErrorMessage>
    </Control>
  )
}
