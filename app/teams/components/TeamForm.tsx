import { Suspense } from "react"
import { useQuery } from "blitz"

import { Field, FieldRenderProps } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"

import {
  InputControl,
  TextareaControl,
  SelectControl,
  CheckboxArrayControl,
  Control,
} from "app/core/components/FormComponents"

import { Button, Box, Stack, useColorModeValue, FormLabel } from "@chakra-ui/react"

import { Form } from "../../core/components/AppForm"
export { FORM_ERROR } from "../../core/components/AppForm"

import getUsers from "app/users/queries/getUsers"

export const TeamForm = (props) => {
  const team = props.initialValues.team

  const [users, { refetch }] = useQuery(getUsers, undefined, {
    suspense: false,
    staleTime: Infinity,
  })

  const isMember = (arg) => {
    if (team) return arg.inTeams.find(({ id }) => id === team.id)
  }

  return (
    <Suspense fallback="Loading...">
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
        <Stack spacing={4}>
          <Form {...props}>
            <Stack spacing={8}>
              <InputControl name="team.title" placeholder="Add a descriptive title" label="Title" />
              <TextareaControl
                name="team.description"
                placeholder="What does this team work on?"
                label="Team Description"
              />
              <FieldArray name="team.members" initialValues>
                {({ fields }) => {
                  return fields.map((name, index) => (
                    <div key={index}>
                      {fields.value[index].name}
                      <Button onClick={() => fields.remove(index)}>Remove</Button>
                    </div>
                  ))
                }}
              </FieldArray>
              <Control name="team.members">
                <FormLabel htmlFor="team.members">Select your team</FormLabel>
                <Stack pl={6} mt={1} spacing={1}>
                  {users?.map((user, index) => {
                    let result = isMember(user)
                    return (
                      <CheckboxArrayControl
                        key={index}
                        name={`team.members`}
                        value={{ id: user.id }}
                        isMember={result ? true : false}
                      >
                        {user.name}
                      </CheckboxArrayControl>
                    )
                  })}
                </Stack>
              </Control>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Suspense>
  )
}

// {/* <FieldArray
//   name="team.members"
//   component={CheckboxGroup}
//   members={users}
//   isMember={isMember}
// /> */}

// const CheckboxGroup = ({ fields, members, isMember }) => {
//   const toggle = (event, member) => {
//     if (event.target.checked) fields.push(member)
//     else fields.remove(member)
//   }
//   return (
//     <div style={{ color: "blue" }}>
//       {members.map((member) => {
//         let result = isMember(member)
//         let isChecked
//         result ? (isChecked = true) : (isChecked = false)
//         return (
//           <div key={member.id}>
//             <input type="checkbox" onClick={(event) => toggle(event, member)} />
//             {member.name}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

/* <div>
                <div>
                  <label>Team members</label>
                </div>
                <div>
                  <Field
                    name="team.members"
                    component="input"
                    type="checkbox"
                    value={97}
                    checked={false}
                    id="team.member[0]"
                  />
                  <label htmlFor="team.member[0]">Ryan</label>
                </div>
                <div>
                  <Field
                    name="team.members"
                    component="input"
                    type="checkbox"
                    value={98}
                    checked={true}
                    id="team.member[1]"
                  />
                  <label htmlFor="team.member[1]">James</label>
                </div>
              </div> */

{
  /* {users?.map((user, index) => {
                let result = user.inTeams.find(({ id }) => id === props.initialValues.team.id)
                if (!result) {
                  return (
                    <div key={index}>
                      {user.name}
                      <Button onClick={props.initialValues.team.members.push()}>Add</Button>
                    </div>
                  )
                } else {
                  return null
                }
              })} */
}
{
  /* <SelectControl
                name="team.members"
                label="Assigned to"
                placeholder="Assign this team!"
                multiple
              >
                {users?.map((user, index) => {
                  console.log(props.initialValues.team.id)
                  let result = user.inTeams.find(({ id }) => id === props.initialValues.team.id)
                  if (!result) {
                    return (
                      <option key={index} value={user.id}>
                        {user.name}
                      </option>
                    )
                  } else {
                    return null
                  }
                })}
              </SelectControl> */
}
