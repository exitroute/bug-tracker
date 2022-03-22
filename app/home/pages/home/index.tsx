import React, { Suspense, useEffect } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"

import { IssueItemCard } from "app/issues/components/IssueItemCard"

import Layout from "app/core/layouts/Layout"
import getCurrentUserIssues from "app/home/queries/getCurrentUserIssues"
import getCurrentUserProjects from "app/home/queries/getCurrentUserProjects"
import { useAppContext } from "app/context/AppContext"
import getIssuesForCharts from "app/issues/queries/getIssuesForCharts"
import { ProjectItemCard } from "app/projects/components/ProjectItemCards"

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
  const [issues] = useQuery(getCurrentUserIssues, undefined)
  const [projects] = useQuery(getCurrentUserProjects, undefined)

  const { setChartData } = useAppContext()
  const [data] = useQuery(getIssuesForCharts, undefined)

  useEffect(() => {
    data && setChartData(data)
  }, [data, setChartData])

  // This list also returns projects and teams
  return (
    <Box>
      <UnorderedList styleType="none" marginLeft="0rem">
        {issues?.map((issue) => (
          <ListItem key={issue.id}>
            <Link href={Routes.IssuePage({ issueId: issue.id })}>
              <a>
                <IssueItemCard
                  id={issue.id}
                  title={issue.title}
                  description={issue.description}
                  assigned={issue.assignedTo}
                  status={issue.status}
                  priority={issue.priority}
                  tag="Issue"
                />
              </a>
            </Link>
          </ListItem>
        ))}
        {projects?.map((project) => (
          <ListItem key={project.id}>
            <Link href={Routes.ProjectPage({ projectId: project.id })}>
              <a>
                <ProjectItemCard props={project} tag="Project" />
              </a>
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
