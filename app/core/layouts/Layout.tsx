import { Head, BlitzLayout } from "blitz"
import { Grid, GridItem, Box } from "@chakra-ui/react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"
import CreateNewIssueButton from "app/issues/components/CreateNewIssueButton"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid templateRows="auto 1fr auto" h="100vh">
        <Header title={title} />
        <Box overflowY="scroll">{children}</Box>
        <CreateNewIssueButton />
        <Navigation />
      </Grid>
    </>
  )
}

export default Layout
