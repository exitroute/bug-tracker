import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react"
import { useDisclosure } from "@chakra-ui/react"

interface AppContextType {
  isFilterOpen: boolean
  onToggle?: () => void
  chartData: any
  setChartData: Dispatch<SetStateAction<{}>>
}

const appContextDefaultValues: AppContextType = {
  isFilterOpen: false,
  chartData: {},
  setChartData: () => {},
}

const AppContext = createContext<AppContextType>(appContextDefaultValues)

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  const { isOpen: isFilterOpen, onToggle } = useDisclosure()
  const [chartData, setChartData] = useState<{}>({})

  const value = {
    isFilterOpen,
    onToggle,
    chartData,
    setChartData,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
