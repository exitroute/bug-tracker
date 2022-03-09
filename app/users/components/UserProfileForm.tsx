import { Suspense } from "react"
import { useQuery } from "blitz"

import { InputControl, TextareaControl, SelectControl } from "app/core/components/FormComponents"

import { Box, Stack, useColorModeValue } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

// import getUsers from "app/users/queries/getUserProfiles"

export const UserProfileForm = (props) => {
  // const [users] = useQuery(getUsers, undefined, { suspense: false })

  return (
    <Suspense fallback="Loading...">
      <Box p={8}>
        <Stack spacing={4}>
          <Form {...props}>
            <Stack spacing={8}>
              <InputControl name="userProfile.name" placeholder="Your name" label="Name" />
              <InputControl name="userProfile.email" placeholder="Your email" label="Email" />
              {/* <SelectControl
                name="issue.assignedTo.id"
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
