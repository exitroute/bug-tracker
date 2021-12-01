import { Link, Routes } from "blitz"
import { Button } from "@chakra-ui/react"
import React from "react"

// takes user to the create new issue page

// add this to every list page

const CreateNewIssueButton = () => {
  return (
    <Link href={Routes.NewIssuePage()}>
      <Button as="a" maxW="32" pos="fixed" right="5" top="75%" colorScheme="blue">
        Create Issue
      </Button>
    </Link>
  )
}

export default CreateNewIssueButton
