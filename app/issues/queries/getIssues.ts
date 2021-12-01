import db from "db"

export default async function getIssues() {
  try {
    const issues = await db.issue.findMany()
    return issues
  } catch (error) {
    console.error("getIssues Error ", error)
  }
}
