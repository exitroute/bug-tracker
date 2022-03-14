/**
 *  This is where users that have signed up and are logged in
 *  can see tickets
 * */

import { Suspense } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem, Heading, Collapse } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { ItemCard } from "app/core/components/ItemCard"
import getIssues from "app/issues/queries/getIssues"
import { useAppContext } from "../../../context/AppContext"

const IssueList = () => {
  const { isFilterOpen } = useAppContext()
  const [issues] = useQuery(getIssues, undefined)

  return (
    <Box>
      <Collapse in={isFilterOpen} animateOpacity>
        <Box
          w={{ base: "100%", md: "60%" }}
          position="fixed"
          bg="white"
          py="2"
          borderBottom="solid 1px"
          borderColor="gray.200"
          shadow="md"
        >
          <Heading as="h3" size="sm" textAlign="center">
            Filters coming soon!
          </Heading>
        </Box>
      </Collapse>
      <UnorderedList styleType="none" marginLeft="0rem">
        {issues?.map((issue) => {
          return (
            <ListItem key={issue.id}>
              <Link href={Routes.IssuePage({ issueId: issue.id })}>
                <a>
                  <ItemCard
                    id={issue.id}
                    title={issue.title}
                    description={issue.description}
                    assigned={issue.assignedTo}
                    status={issue.status}
                    priority={issue.priority}
                  />
                </a>
              </Link>
            </ListItem>
          )
        })}
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

Issues.authenticate = { redirectTo: "/" }
Issues.suppressFirstRenderFlicker = true
Issues.getLayout = (page) => <Layout title="Issues">{page}</Layout>

export default Issues
