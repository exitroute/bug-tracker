import { Link, Routes } from "blitz"
import React from "react"
import styles from "./CreateNewIssueButton.module.css"

// takes user to the create new issue page

// add this to every list page

const CreateNewIssueButton = () => {
  return (
    <div className={styles.wrapper}>
      <Link href={Routes.NewIssuePage()}>
        <a className={styles.anchor}>Create Issue</a>
      </Link>
    </div>
  )
}

export default CreateNewIssueButton
