import { Head, BlitzLayout } from "blitz"
import Navigation from "../components/Navigation"
import styles from "./Layout.module.css"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title || "bug-tracker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div>Profile</div>
        <div>Category</div>
      </header>
      <div className={styles.content}>{children}</div>

      <Navigation />
    </div>
  )
}

export default Layout
