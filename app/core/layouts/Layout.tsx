import { Head, BlitzLayout } from "blitz"
import { Flex, Box } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"
import { Suspense } from "react"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="loading">
        <Header title={title}>{children}</Header>
      </Suspense>
    </>
  )
}

export default Layout
