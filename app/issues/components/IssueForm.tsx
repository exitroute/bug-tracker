import React, { Suspense, useCallback } from "react"
import { useQuery } from "blitz"

import { Box, Stack, useColorModeValue, Radio } from "@chakra-ui/react"

import { Field, FieldRenderProps } from "react-final-form"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"
import {
  InputControl,
  TextareaControl,
  SelectControl,
  AdaptedRadioGroup,
} from "app/core/components/FormComponents"
import { MultipleFileUploadField } from "app/core/components/MultipleFileUploadField"

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
              <IssuePriority name="issue.priority" />
              <IssueStatus name="issue.status" />
              <Field name="issue.files" component={MultipleFileUploadField} />
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}

interface IssueRadioProps {
  name: string
}

const IssuePriority = ({ name }: IssueRadioProps) => {
  return (
    <Field name={name} label="Priority" component={AdaptedRadioGroup}>
      <Stack>
        <Radio value="URGENT">Urgent</Radio>
        <Radio value="HIGH">High</Radio>
        <Radio value="NORMAL">Normal</Radio>
        <Radio value="LOW">Low</Radio>
      </Stack>
    </Field>
  )
}

const IssueStatus = ({ name }: IssueRadioProps) => {
  return (
    <Field name={name} label="Progress Status" component={AdaptedRadioGroup}>
      <Stack>
        <Radio value="NEW">New</Radio>
        <Radio value="IN_PROGRESS">In Progress</Radio>
        <Radio value="CLOSED">Closed</Radio>
      </Stack>
    </Field>
  )
}
