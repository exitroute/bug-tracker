import React from "react"
import { Box } from "@chakra-ui/react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import faker from "faker"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
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

const labels = ["New", "In progress", "Closed"]

export const data = {
  labels,
  datasets: [
    {
      label: "Issues",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: "#3182ce",
    },
  ],
}

export function StatusChart() {
  return (
    <Box paddingX="1rem" h="30vh" w="100%" position="relative">
      <Bar options={options} data={data} />
    </Box>
  )
}
