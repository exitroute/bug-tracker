import { Suspense } from "react"
import { useQuery, useSession } from "blitz"

import { InputControl, SelectControl } from "app/core/components/FormComponents"

import { Box, Stack } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

import getTeams from "app/teams/queries/getTeams"

export const UserProfileForm = (props) => {
  const [teams] = useQuery(getTeams, undefined, { suspense: false })
  const session = useSession()

  return (
    <Suspense fallback="Loading...">
      <Box p={8}>
        <Stack spacing={4}>
          <Form {...props}>
            <Stack spacing={8}>
              <InputControl name="userProfile.name" placeholder="" label="Name" />
              <InputControl name="userProfile.email" placeholder="" label="Email" />
              {/* TODO Add About */}
              {/* <TextareaControl name="userProfile.about" placeholder="" label="About" /> */}
              <SelectControl
                name="userProfile.inTeams.id"
                label="Assign to team"
                placeholder="Find a team!"
              >
                {teams?.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.title}
                  </option>
                ))}
              </SelectControl>
              {session.role === "ADMIN" ? (
                <SelectControl name="userProfile.role" label="Role" placeholder="User role">
                  <option key={1} value="USER">
                    USER
                  </option>
                  <option key={2} value="ADMIN">
                    ADMIN
                  </option>
                </SelectControl>
              ) : null}
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}
