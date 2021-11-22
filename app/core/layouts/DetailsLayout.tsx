import { Head, BlitzLayout } from "blitz"
import React from "react"
import styles from "./DetailsLayout.module.css"
import DetailsHeader from "app/core/components/DetailsHeader"

const DetailsLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailsHeader title={title} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default DetailsLayout
