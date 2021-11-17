import db from "db"

export default async function getIssues() {
  const issues = await db.issue.findMany()
  return issues
}
