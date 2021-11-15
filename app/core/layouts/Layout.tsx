import { Head, BlitzLayout } from "blitz"
import styles from "./Layout.module.css"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>{children}</div>

      {children}
    </>
  )
}

export default Layout
