/**
 *  This is where users that have signed up and are logged in
 *  can see tickets
 * */

import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/issues/queries/getIssues"

const IssueList = () => {
  const [issues] = useQuery(getIssues, undefined)
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

const Issues: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback="Loading issues...">
        <IssueList />
      </Suspense>
    </main>
  )
}

Issues.authenticate = true
Issues.suppressFirstRenderFlicker = true
Issues.getLayout = (page) => <Layout title="Issues">{page}</Layout>

export default Issues
