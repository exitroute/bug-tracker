import { Suspense } from "react"
// import { useQuery } from "blitz"

import { InputControl, TextareaControl } from "app/core/components/FormComponents"

import { Box, Stack, useColorModeValue } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

// import getIssues from "app/issues/queries/getIssues"
// TODO filter without projects to make list smaller

export const ProjectForm = (props) => {
  // const [issues] = useQuery(getIssues, undefined, { suspense: false })

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
              {/* <SelectControl
                name=".assignedTo.id"
                label="Assigned to"
                placeholder="Assign this issue!"
              >
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </SelectControl> */}
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}
