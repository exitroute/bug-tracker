import React, { Suspense, useState, useEffect } from "react"
import { useQuery, useRouter } from "blitz"

import { Box, Stack, Flex, Radio, Image, IconButton } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

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
  const router = useRouter()
  const path = router.pathname.split("/").pop()

  return (
    <Suspense fallback="Loading...">
      <Box p={8}>
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
              {path === "new" ? (
                <Field name="issue.files" component={MultipleFileUploadField} />
              ) : (
                <>
                  <Field name="issue.newFiles" component={MultipleFileUploadField} />
                  {props.initialValues.issue.files && (
                    <Field name="issue.files" files={props.initialValues.issue.files}>
                      {(props) => <EditIssueFiles props={props} />}
                    </Field>
                  )}
                </>
              )}
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}

interface FilesToEdit {
  id: number
  issueId: number
  url: string
}

const EditIssueFiles = ({ props }: any) => {
  const input = props.input
  const initFiles = props.files

  const [files, setFiles] = useState<FilesToEdit[]>(initFiles)

  const onDelete = (id: number, url: string, files: FilesToEdit[]) => {
    setFiles(files.filter((file) => file.id != id))
    confirm(`This will remove image ${url} \n Are you sure?`)
  }

  useEffect(() => {
    input.onChange(files)
  }, [files, input])

  return (
    <>
      {files.map((file, i, files) => (
        <Flex key={i} alignItems="center">
          <Image boxSize="100px" src={file.url} alt="screen shot" />
          <IconButton
            type="button"
            aria-label="Delete issue screenshot"
            colorScheme="gray.700"
            onClick={() => onDelete(file.id, file.url, files)}
            ml={4}
            variant="outline"
            icon={<DeleteIcon />}
          ></IconButton>
        </Flex>
      ))}
    </>
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
