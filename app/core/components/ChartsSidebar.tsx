import {
  Box,
  Flex,
  Heading,
  CloseButton,
  Select,
  Stack,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react"

import { useRouter } from "blitz"
import { IssueCharts } from "app/issues/components/IssueCharts"
import React, { Suspense, useState } from "react"
import { useAppContext } from "app/context/AppContext"

export const ChartsSidebar = ({ onClose, ...rest }) => {
  const router = useRouter()
  const disabled = router.pathname.split("/").find((el) => el === "issues" || el === "home")
    ? false
    : true

  const { chartData } = useAppContext()
  const [selectedChart, setSelectedChart] = useState<string>("")

  const selectChartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chart = event.target.value
    setSelectedChart(chart)
  }

  return (
    <Box
      as="aside"
      h="full"
      w={{ base: "full", md: "20%" }}
      borderLeft="1px"
      borderLeftColor="gray.200"
      bg="white"
      {...rest}
    >
      <Flex p="1rem" justifyContent={{ base: "space-between" }} alignItems="center" w="100%">
        <Heading textAlign={{ base: "center" }} size="lg" w={{ md: "100%" }}>
          Charts
        </Heading>
        <CloseButton as="button" display={{ base: "flex", md: "none" }} onClick={onClose} />{" "}
      </Flex>
      <Stack p="4">
        <Stat display={!disabled ? "block" : "none"}>
          <Suspense fallback="Loading...">
            <StatLabel>Total Issues</StatLabel>
            <StatNumber>{chartData.totalIssues?._all}</StatNumber>
          </Suspense>
        </Stat>
        <Select
          placeholder="Select Chart"
          size="sm"
          onChange={selectChartChange}
          disabled={disabled}
        >
          <option value="users">Issues per user</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
        </Select>
      </Stack>
      <Flex h="100%" direction="column" pt="4" alignItems="center">
        <Suspense fallback="Loading...">
          <IssueCharts selectedChart={selectedChart} chartData={chartData} />
        </Suspense>
      </Flex>
    </Box>
  )
}
