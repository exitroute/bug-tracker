import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"

import Layout from "app/core/layouts/Layout"
import getIssues from "app/issues/queries/getIssues"

/**
 *
 * @returns list of users bugs, teams, projects, open unassigned bugs
 */

/**
 * this is where the user arrives after logging in
 *
 * In the feed user sees their
 *  active tickets
 *  projects
 *  team
 *
 * and any unassigned tickets
 *
 * The user can
 *  go to their profile
 *  go to search
 *  go to users
 *  go to tickets
 *
 */

const HomeList = () => {
  const [issues] = useQuery(getIssues, undefined)
  // This list also returns projects and teams
  return (
    <Box>
      <UnorderedList styleType="none">
        {issues?.map((issue) => (
          <ListItem key={issue.id}>
            <Link href={Routes.IssuePage({ issueId: issue.id })}>
              <a>{issue.title}</a>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

const Home: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback="Loading your data...">
        <HomeList />
      </Suspense>
    </main>
  )
}

Home.authenticate = { redirectTo: "/" }
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
