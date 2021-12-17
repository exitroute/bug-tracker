import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getUserProfiles from "app/users/queries/getUserProfiles"

const UserProfileList = () => {
  const [users] = useQuery(getUserProfiles, undefined)
  return (
    <Box>
      <UnorderedList styleType="none">
        {users?.map((user) => (
          <ListItem key={user.id}>
            <Link href={Routes.UserProfilePage({ userId: user.id })}>
              <a>{user.name}</a>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

const UserProfiles: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback="Loading issues...">
        <UserProfileList />
      </Suspense>
    </main>
  )
}

UserProfiles.authenticate = { redirectTo: "/" }
UserProfiles.suppressFirstRenderFlicker = true
UserProfiles.getLayout = (page) => <Layout title="Profiles">{page}</Layout>

export default UserProfiles
