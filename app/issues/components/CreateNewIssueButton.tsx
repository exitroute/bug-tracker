import { Link, Routes } from "blitz"
import { Button } from "@chakra-ui/react"
import React from "react"

// takes user to the create new issue page

// add this to every list page

const CreateNewIssueButton = () => {
  return (
    <Link href={Routes.NewIssuePage()}>
      <Button as="a" size="sm" colorScheme="blue">
        Create Issue
      </Button>
    </Link>
  )
}

export default CreateNewIssueButton
