import { Suspense } from "react"
import { useQuery } from "blitz"

import { InputControl, TextareaControl, SelectControl } from "app/core/components/FormComponents"

import { Box, Stack, useColorModeValue } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

import getIssuesWithNoProject from "app/issues/queries/getIssuesWithNoProject"
// TODO filter without projects to make list smaller

export const ProjectForm = (props) => {
  const [issues] = useQuery(getIssuesWithNoProject, undefined, { suspense: false })

  return (
    <Suspense fallback="Loading...">
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
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
              <SelectControl
                name="project.assignedTo.id"
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
