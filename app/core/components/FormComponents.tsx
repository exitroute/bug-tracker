import { Field, useField } from "react-final-form"

import {
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react"

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

export const CheckboxControl = ({ name, value, children }) => {
  const {
    input: { checked, ...input },
    meta: { error, touched, invalid },
  } = useField(name, {
    type: "checkbox", // important for RFF to manage the checked prop
  })
  return (
    <FormControl isInvalid={touched && invalid} my={4}>
      <Checkbox {...input} isInvalid={touched && invalid} my={4}>
        {children}
      </Checkbox>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export const CheckboxArrayControl = ({ name, value, isMember, children }) => {
  const {
    input: { checked, ...input },
    meta: { error, touched },
  } = useField(name, {
    type: "checkbox", // important for RFF to manage the checked prop
    value, // important for RFF to manage list of strings
  })

  let defaultChecked
  isMember === true ? (defaultChecked = true) : (defaultChecked = false)

  // let isChecked
  // const toggleChecked = (e) => {
  //   if (e.target.checked) {
  //     isChecked === true
  //   } else {
  //     isChecked === false
  //   }
  // }

  return (
    <Checkbox
      {...input}
      // isChecked={isChecked}
      defaultChecked={defaultChecked}
      isInvalid={error && touched}
      // onChange={(e) => toggleChecked(e)}
    >
      {children}
    </Checkbox>
  )
}
