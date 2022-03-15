import { createContext, useContext, ReactNode } from "react"
import { useDisclosure } from "@chakra-ui/react"

interface AppContextType {
  isFilterOpen: boolean
  onToggle?: () => void
}

const appContextDefaultValues: AppContextType = {
  isFilterOpen: false,
}

const AppContext = createContext<AppContextType>(appContextDefaultValues)

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  const { isOpen: isFilterOpen, onToggle } = useDisclosure()

  const value = {
    isFilterOpen,
    onToggle,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
