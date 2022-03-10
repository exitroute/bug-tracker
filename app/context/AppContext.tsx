import { createContext, useContext, ReactNode } from "react"
import { useDisclosure } from "@chakra-ui/react"

interface AppContextType {
  isOpen?: boolean
  onToggle?: any
}

const appContextDefaultValues: AppContextType = {}

const AppContext = createContext<AppContextType>(appContextDefaultValues)

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  const { isOpen, onToggle } = useDisclosure()

  const value = {
    isOpen,
    onToggle,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
