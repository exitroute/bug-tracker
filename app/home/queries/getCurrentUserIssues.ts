import { Ctx } from "blitz"
import db from "db"

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
    return issues
  } catch (error) {
    console.error("getIssues Error ", error)
  }
}
