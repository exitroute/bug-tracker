import React, { Suspense } from "react"
import { Box } from "@chakra-ui/react"
import { useQuery } from "blitz"
import getIssues from "../queries/getIssues"

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
import { Bar, Doughnut } from "react-chartjs-2"
import faker from "faker"

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend)

export function StatusChart({ selectedChart }) {
  const [issues] = useQuery(getIssues, undefined)

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

  const statusLabels = ["New", "In progress", "Closed"]

  const statusData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Progress Status",
        data: statusLabels.map(() => faker.datatype.number({ min: 0, max: 20 })),
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

  const priorityLabels = ["Low", "Normal", "High"]

  const priorityData = {
    labels: priorityLabels,
    datasets: [
      {
        label: "Priority",
        data: priorityLabels.map(() => faker.datatype.number({ min: 0, max: 20 })),
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

  const userLabels = ["Ryan", "James", "Felton", "Astrid"]

  const userData = {
    labels: userLabels,
    datasets: [
      {
        label: "Users",
        data: userLabels.map(() => faker.datatype.number({ min: 0, max: 20 })),
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

  return (
    <Box paddingX="1rem" h="50%" w="100%" position="relative">
      {selectedChart === "status" && <Doughnut options={options} data={statusData} />}
      {selectedChart === "priority" && <Doughnut options={options} data={priorityData} />}
      {selectedChart === "users" && <Doughnut options={options} data={userData} />}
    </Box>
  )
}
