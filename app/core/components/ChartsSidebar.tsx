import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, CloseButton, Select } from "@chakra-ui/react"
import { StatusChart } from "app/issues/components/IssueCharts"
import { Suspense, useState } from "react"

export const ChartsSidebar = ({ onClose, ...rest }) => {
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
      <Box>
        <Box p="4">
          <Select placeholder="Select Chart" size="sm" onChange={selectChartChange}>
            <option value="users">Issues per user</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </Select>
        </Box>
      </Box>
      <Flex h="100%" direction="column" pt="4" alignItems="center">
        <Suspense fallback="Loading...">
          <StatusChart selectedChart={selectedChart} />
        </Suspense>
      </Flex>
    </Box>
  )
}
