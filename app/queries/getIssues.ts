import db from "db"

export default async function getIssues() {
  return db.issue.findMany()
}
