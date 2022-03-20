import React from "react"
import { Box } from "@chakra-ui/react"
import { useQuery } from "blitz"
import getIssuesForCharts from "../queries/getIssuesForCharts"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend)

export function IssueCharts({ selectedChart, chartData }) {
  const { totalIssues, issuesPerUser, priority, status, users }: any = chartData

  const totalUnassignedIssues = totalIssues?._all - totalIssues?.assignedToId

  const userChartData = issuesPerUser?.map((user) => {
    if (user.assignedToId === null) {
      user.assignedToName = "Unassigned"
      user._count.assignedToId = totalUnassignedIssues
    } else {
      const { name } = users.find((el) => el.id === user.assignedToId)
      user.assignedToName = name
    }
    return user
  })

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  }

  const statusData = {
    labels: status?.map((el) => el.status),
    datasets: [
      {
        label: "Progress Status",
        data: status?.map((el) => el._count.status),
        // backgroundColor: "#3182ce",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const priorityData = {
    labels: priority?.map((el) => el.priority),
    datasets: [
      {
        label: "Priority",
        data: priority?.map((el) => el._count.priority),
        // backgroundColor: "#3182ce",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const userData = {
    labels: userChartData?.map((el) => el.assignedToName),
    datasets: [
      {
        label: "Users",
        data: userChartData?.map((el) => el._count.assignedToId),
        // backgroundColor: "#3182ce",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "#9733e852",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "#9633e8",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Box paddingX="1rem" h="50%" w="100%" position="relative">
      {selectedChart === "status" && <Doughnut options={options} data={statusData} />}
      {selectedChart === "priority" && <Doughnut options={options} data={priorityData} />}
      {selectedChart === "users" && <Doughnut options={options} data={userData} />}
    </Box>
  )
}
