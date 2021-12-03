import { Suspense } from "react"
import { useQuery } from "blitz"

import { InputControl, TextareaControl, SelectControl } from "app/core/components/FormComponents"

import { Box, Stack, useColorModeValue } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

// import getUsers from "app/users/queries/getUsers"

export const TeamForm = (props) => {
  // const [users] = useQuery(getUsers, undefined, { suspense: false })

  return (
    <Suspense fallback="Loading...">
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
        <Stack spacing={4}>
          <Form {...props}>
            <Stack spacing={8}>
              <InputControl name="team.title" placeholder="Add a descriptive title" label="Title" />
              <TextareaControl
                name="team.description"
                placeholder="What did you expect to happen?"
                label="Expected Behaviour"
              />
              {/* <SelectControl
                name="team.assignedTo.id"
                label="Assigned to"
                placeholder="Assign this team!"
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
