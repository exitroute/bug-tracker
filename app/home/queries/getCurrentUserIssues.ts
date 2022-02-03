import { Ctx } from "blitz"
import db from "db"
import { sortIssues } from "app/core/filters/filters"

export default async function getCurrentUserIssues(_ = null, { session }: Ctx) {
  const id = session.userId

  try {
    const issues = await db.issue.findMany({
      where: { assignedToId: id },
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
