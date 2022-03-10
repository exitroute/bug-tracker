import { createContext, useContext, ReactNode, useState } from "react"
import { useDisclosure } from "@chakra-ui/react"

interface AppContextType {
  // areFilters: boolean
  // showFilters?: any
  isOpen?: boolean
  onToggle?: any
}

const appContextDefaultValues: AppContextType = {
  // areFilters: false,
  // isOpen: f,
}

const AppContext = createContext<AppContextType>(appContextDefaultValues)

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  // const [areFilters, setAreFilters] = useState<boolean>(false)
  const { isOpen, onToggle } = useDisclosure()

  // const showFilters = () => {
  //   setAreFilters((perv) => !perv)
  // }

  const value = {
    // areFilters,
    // showFilters,
    isOpen,
    onToggle,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
