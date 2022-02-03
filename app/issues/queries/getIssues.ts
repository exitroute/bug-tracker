import db from "db"
import { sortIssues } from "app/core/filters/filters"

export default async function getIssues() {
  try {
    const issues = await db.issue.findMany({
      include: {
        assignedTo: {
          select: {
            name: true,
          },
        },
      },
    })
    return sortIssues(issues)
  } catch (error) {
    console.error("getIssues Error ", error)
  }
}
