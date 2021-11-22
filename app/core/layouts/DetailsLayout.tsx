import { Head, BlitzLayout } from "blitz"
import React, { Suspense } from "react"
import styles from "./DetailsLayout.module.css"
import EditIssueButton from "app/issues/components/EditIssueButton"

const DetailsLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <a href="">Back</a>
        <Suspense fallback="Loading...">
          {title === "Issue" ? (
            <EditIssueButton />
          ) : (
            <button form="issue-form" type="submit">
              Save
            </button>
          )}
        </Suspense>
      </header>

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default DetailsLayout
