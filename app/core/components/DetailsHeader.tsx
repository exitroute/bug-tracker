import { Link, useParam } from "blitz"

const DetailsHeader = ({ title }) => {
  const issueId = useParam("issueId", "number")!
  return (
    <header>
      {(() => {
        switch (title) {
          case "Issue":
            return (
              <Link href={"/issues"}>
                <a>Back</a>
              </Link>
            )
          case "Edit":
            return (
              <Link href={`/issues/${issueId}`}>
                <a>Back</a>
              </Link>
            )
          case "New":
            return (
              <Link href={`/home`}>
                <a>Back</a>
              </Link>
            )
          default:
            return null
        }
      })()}
    </header>
  )
}

export default DetailsHeader
