import { Suspense } from "react"
import { useQuery } from "blitz"

import { FieldArray } from "react-final-form-arrays"
import { InputControl, TextareaControl, SelectControl } from "app/core/components/FormComponents"
import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

import { Box, Stack, Button, useColorModeValue } from "@chakra-ui/react"

import getIssuesWithNoProject from "app/issues/queries/getIssuesWithNoProject"
// TODO filter without projects to make list smaller

export const ProjectForm = (props) => {
  const [issues] = useQuery(getIssuesWithNoProject, undefined, { suspense: false })

  return (
    <Suspense fallback="Loading...">
      <Box p={8}>
        <Stack spacing={4}>
          <Form {...props}>
            <Stack spacing={8}>
              <InputControl
                name="project.title"
                placeholder="Add a descriptive title"
                label="Project Title"
              />
              <TextareaControl
                name="project.description"
                placeholder="Give a short description of the goals."
                label="Project Description"
              />
              {/* TODO Make into assignIssue tool */}
              <FieldArray name="project.assignedIssue.id" initialValues>
                {({ fields }) => {
                  return fields.map((name, index) => (
                    <div key={index}>
                      {fields.value[index].title}
                      <Button onClick={() => fields.remove(index)}>Remove</Button>
                    </div>
                  ))
                }}
              </FieldArray>
              <SelectControl
                name="project.assignedIssue.id"
                label="Assigned to"
                placeholder="Find issues for this project!"
              >
                {issues?.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    {issue.title}
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
