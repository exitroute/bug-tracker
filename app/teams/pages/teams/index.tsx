/**
 *  This is where users that have signed up and are logged in
 *  can see tickets
 * */

import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getTeams from "app/teams/queries/getTeams"

const TeamList = () => {
  const [teams] = useQuery(getTeams, undefined)
  return (
    <Box>
      <UnorderedList styleType="none">
        {teams?.map((team) => (
          <ListItem key={team.id}>
            <Link href={Routes.TeamPage({ teamId: team.id })}>
              <a>{team.title}</a>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

const Teams: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback="Loading teams...">
        <TeamList />
      </Suspense>
    </main>
  )
}

Teams.authenticate = true
Teams.suppressFirstRenderFlicker = true
Teams.getLayout = (page) => <Layout title="Teams">{page}</Layout>

export default Teams
