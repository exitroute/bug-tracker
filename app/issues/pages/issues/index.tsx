/**
 *  This is where users that have signed up and are logged in
 *  can see tickets
 * */

import { Suspense, useEffect, useState } from "react"
import { Link, BlitzPage, Routes, useQuery } from "blitz"
import { Box, UnorderedList, ListItem, Heading, Collapse } from "@chakra-ui/react"
import { Select, Stack, Button, Flex, Spacer } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { ItemCard } from "app/core/components/ItemCard"
import { useAppContext } from "../../../context/AppContext"
import getUsers from "app/users/queries/getUsers"
import getFilteredIssues, { Filter } from "app/issues/queries/getFilteredIssues"
import getIssuesForCharts from "app/issues/queries/getIssuesForCharts"

const IssueList = () => {
  const { isFilterOpen, setChartData } = useAppContext()
  // console.log("isFilterOpen", isFilterOpen)

  const [data] = useQuery(getIssuesForCharts, undefined)
  useEffect(() => {
    data && setChartData(data)
  }, [data, setChartData])

  const [filter, setFilter] = useState<Filter>({
    id: 0,
    status: "",
    priority: "",
  })

  const [issues] = useQuery(getFilteredIssues, filter)
  const [users] = useQuery(getUsers, undefined)

  const [selectedUser, setSelectedUser] = useState<number | null>(0)
  const [selectedStatus, setSelectedStatus] = useState<string | null>("")
  const [selectedPriority, setSelectedPriority] = useState<string | null>("")

  const selectUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = JSON.parse(event.target.value)
    setSelectedUser(id)
  }

  const selectStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = JSON.parse(event.target.value)
    setSelectedStatus(status)
  }

  const selectPriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = JSON.parse(event.target.value)
    setSelectedPriority(priority)
  }

  return (
    <Box>
      <Box position="sticky" top="0">
        <Collapse in={isFilterOpen} animateOpacity unmountOnExit={true}>
          <Box
            w={{ base: "100%" }}
            bg="white"
            p="4"
            borderBottom="solid 1px"
            borderColor="gray.200"
            shadow="md"
          >
            <Stack>
              <Flex>
                <Select size="sm" w="30%" onChange={selectUserChange}>
                  <option value={JSON.stringify(0)}>{`All Users`}</option>
                  <option value={JSON.stringify(null)}>{`Unassigned`}</option>
                  {users?.map((el: any, i: any) => (
                    <option key={i} value={JSON.stringify(el.id)}>
                      {el.name}
                    </option>
                  ))}
                </Select>
                <Spacer />
                <Select size="sm" w="30%" onChange={selectStatusChange} disabled>
                  <option value={JSON.stringify("")}>{`All Statuses`}</option>
                  <option value={JSON.stringify(null)}>{`Status not set`}</option>
                  <option value={JSON.stringify("NEW")}>{`New`}</option>
                  <option value={JSON.stringify("IN_PROGRESS")}>{`In progress`}</option>
                  <option value={JSON.stringify("CLOSED")}>{`Closed`}</option>
                </Select>
                <Spacer />
                <Select size="sm" w="30%" onChange={selectPriorityChange} disabled>
                  <option value={JSON.stringify("")}>{`All Priorities`}</option>
                  <option value={JSON.stringify(null)}>{`Priority not set`}</option>
                  <option value={JSON.stringify("LOW")}>{`Low`}</option>
                  <option value={JSON.stringify("NORMAL")}>{`Normal`}</option>
                  <option value={JSON.stringify("HIGH")}>{`High`}</option>
                </Select>
              </Flex>
              <Flex align="center">
                <FilterButton
                  setFilter={setFilter}
                  selectedUser={selectedUser}
                  selectedStatus={selectedStatus}
                  selectedPriority={selectedPriority}
                />
              </Flex>
            </Stack>
          </Box>
        </Collapse>
      </Box>
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

const FilterButton = ({ setFilter, selectedUser, selectedStatus, selectedPriority }) => {
  const handleFilterEvent = (e) => {
    e.preventDefault()
    setFilter({
      id: selectedUser,
      status: selectedStatus,
      priority: selectedPriority,
    })
  }

  return (
    <Button width="30%" mx="auto" onClick={(e) => handleFilterEvent(e)}>
      Filter
    </Button>
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
