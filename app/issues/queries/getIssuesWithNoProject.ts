import db from "db"

export default async function getIssuesWithNoProject() {
  try {
    const issues = await db.issue.findMany({
      where: {
        projectId: null,
      },
    })
    return issues
  } catch (error) {
    console.error("Get issues with no project assigned", error)
  }
}
