import { Link, useParam } from "blitz"

const DetailsHeader = ({ title }) => {
  const issueId = useParam("issueId", "number")!
  return (
    <header>
      {title === "Issue" ? (
        <Link href={"/issues"}>
          <a>Back</a>
        </Link>
      ) : (
        <Link href={`/issues/${issueId}`}>
          <a>Back</a>
        </Link>
      )}
      <br />
      {title === "Issue" ? (
        <Link href={`/issues/${issueId}/edit`}>
          <a>Update Issue</a>
        </Link>
      ) : (
        <button form="issue-form" type="submit">
          Save
        </button>
      )}
    </header>
  )
}

export default DetailsHeader
