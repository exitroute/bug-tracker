import { Suspense } from "react"
import { useQuery } from "blitz"
import { Field, useField } from "react-final-form"

import {
  Box,
  Stack,
  useColorModeValue,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"

import { Form } from "./Form"
export { FORM_ERROR } from "./Form"

import getUsers from "app/users/queries/getUsers"

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
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return <FormControl {...rest} isInvalid={error && touched} />
}

const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } })
  return <FormErrorMessage>{error}</FormErrorMessage>
}

const InputControl = ({ name, placeholder, label }) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...input} isInvalid={meta.error && meta.touched} placeholder={placeholder} />
      <Error name={label} />
    </Control>
  )
}

const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
)

const TextareaControl = ({ name, placeholder, label }) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name} component={AdaptedTextarea} placeholder={placeholder} />
      <Error name={label} />
    </Control>
  )
}

const SelectControl = ({ name, label, children, placeholder, ...props }) => {
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
